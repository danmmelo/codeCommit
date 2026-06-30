# LAB - AWS Elastic Beanstalk + CodePipeline

## Objetivo

Neste laboratório você aprenderá a:

-   Criar uma aplicação Node.js com Express.
-   Publicar a aplicação no AWS Elastic Beanstalk.
-   Atualizar versões da aplicação.
-   Automatizar o deploy utilizando AWS CodePipeline.

------------------------------------------------------------------------

# Arquitetura Inicial

``` text
Desenvolvedor
      │
      ▼
Elastic Beanstalk CLI
      │
      ▼
Elastic Beanstalk
      │
      ▼
Amazon EC2
      │
      ▼
Node.js
      │
      ▼
Express
```

------------------------------------------------------------------------

# Arquitetura Final (CI/CD)

``` text
GitHub / CodeCommit
        │
        ▼
CodePipeline
        │
        ▼
CodeBuild (Opcional)
        │
        ▼
Elastic Beanstalk
        │
        ▼
Amazon EC2
        │
        ▼
Node.js
        │
        ▼
Express
```

------------------------------------------------------------------------

# Pré-requisitos

-   Node.js
-   npm
-   AWS CLI
-   EB CLI

``` bash
node -v
npm -v
aws --version
eb --version
```

------------------------------------------------------------------------

# Criar a aplicação

``` bash
mkdir nodejs-example-express-rds
cd nodejs-example-express-rds
npm init -y
npm install express
```

Crie o arquivo `server.js`:

``` javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Elastic Beanstalk!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

No `package.json`:

``` json
"scripts": {
  "start": "node server.js"
}
```

------------------------------------------------------------------------

# Testar localmente

``` bash
npm start
```

Acesse:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# Configurar o Elastic Beanstalk

``` bash
eb init
```

Informe:

-   Região: us-east-1
-   Plataforma: Node.js
-   Nome da aplicação: nodejs-example

------------------------------------------------------------------------

# Criar o ambiente

``` bash
eb create nodejs-env
```

Recursos criados automaticamente:

-   Amazon EC2
-   IAM Role
-   Security Group
-   Auto Scaling Group
-   Elastic Load Balancer (quando necessário)
-   Amazon S3
-   Amazon CloudWatch

------------------------------------------------------------------------

# Publicar a aplicação

``` bash
eb deploy
```

Abrir a aplicação:

``` bash
eb open
```

Atualizar uma versão:

``` bash
eb deploy
```

------------------------------------------------------------------------

# Integrando com o CodePipeline

Após validar o deploy manual, automatize o processo.

## Etapa 1

Acesse:

``` text
AWS Console
↓
CodePipeline
↓
Create Pipeline
```

## Etapa 2

Pipeline Name:

``` text
NodeJS-ElasticBeanstalk-Pipeline
```

## Etapa 3

Service Role:

``` text
Create new service role
```

## Etapa 4

Source Provider:

``` text
GitHub (Version 2)
```

ou

``` text
CodeCommit
```

Selecione:

-   Repositório
-   Branch (main ou master)

## Etapa 5

Build

Escolha uma das opções:

-   Skip Build (para aplicações simples)
-   AWS CodeBuild (recomendado)

Se utilizar CodeBuild, o projeto deve possuir um `buildspec.yml`.

## Etapa 6

Deploy Provider

Selecione:

``` text
AWS Elastic Beanstalk
```

Application:

``` text
nodejs-example
```

Environment:

``` text
nodejs-env
```

Clique em **Create Pipeline**.

------------------------------------------------------------------------

# Fluxo do CodePipeline

``` text
git push
    │
    ▼
GitHub / CodeCommit
    │
    ├── Armazena o código-fonte
    └── Dispara o gatilho da pipeline
    │
    ▼
CodePipeline
    │
    ├── Orquestra todas as etapas
    ├── Obtém o código do repositório
    └── Aciona os serviços seguintes
    │
    ▼
CodeBuild (Opcional)
    │
    ├── Lê e executa o buildspec.yml
    ├── Instala dependências (npm install, mvn install, etc.)
    ├── Executa testes automatizados
    ├── Compila a aplicação (quando necessário)
    ├── Executa validações (Lint, Unit Tests, etc.)
    └── Gera o artefato de deploy (.zip, .jar, etc.)
    │
    ▼
               Escolha a estratégia de Deploy
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
Elastic Beanstalk              CodeDeploy
        │                           │
        │                           ├── Recebe o artefato
        │                           ├── Envia para a EC2 existente
        │                           ├── CodeDeploy Agent lê o appspec.yml
        │                           ├── Executa BeforeInstall
        │                           ├── Executa AfterInstall
        │                           ├── Executa ApplicationStart
        │                           ├── Executa ValidateService
        │                           └── Finaliza o deploy
        │
        ├── Recebe o artefato
        │
        ├── Na primeira criação do ambiente:
        │     ├── Cria EC2
        │     ├── Cria IAM Role
        │     ├── Cria Security Group
        │     ├── Cria Auto Scaling Group
        │     ├── Cria Load Balancer (quando necessário)
        │     ├── Configura CloudWatch
        │     └── Instala a plataforma (Node.js, Java, Python...)
        │
        ├── Em cada novo deploy:
        │     ├── Atualiza a aplicação
        │     ├── Instala dependências da plataforma (quando necessário)
        │     ├── Reinicia a aplicação
        │     └── Executa Health Checks
        │
        ▼                           ▼
      Amazon EC2               Amazon EC2
        │                           │
        ├── Amazon Linux            ├── Amazon Linux
        ├── Node.js                 ├── Node.js
        ├── Express                 ├── Express
        └── Aplicação               └── Aplicação
        │                           │
        └──────────────┬────────────┘
                       ▼
           Aplicação disponível aos usuários
text
```
------------------------------------------------------------------------

# Testando

Altere o `server.js`:

``` javascript
res.send("Nova versão da aplicação!");
```

Execute:

``` bash
git add .
git commit -m "Atualiza aplicação"
git push
```

A pipeline detectará a alteração e iniciará um novo deploy
automaticamente.

------------------------------------------------------------------------

# Comandos úteis

``` bash
eb status
eb health
eb logs
eb deploy
eb open
eb terminate
```

------------------------------------------------------------------------

# Resumo

  Serviço               Responsabilidade
  --------------------- ---------------------------------------
  GitHub / CodeCommit   Armazenar o código-fonte
  CodePipeline          Orquestrar o CI/CD
  CodeBuild             Compilar e testar (opcional)
  Elastic Beanstalk     Gerenciar o deploy e a infraestrutura
  EC2                   Executar a aplicação
  CloudWatch            Logs e monitoramento
