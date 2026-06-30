# LAB - AWS Elastic Beanstalk com Node.js e Express

## Objetivo

Neste laboratório você aprenderá a criar, configurar e publicar uma
aplicação Node.js utilizando o AWS Elastic Beanstalk.

Ao final do laboratório será possível:

-   Criar uma aplicação Express.
-   Testar localmente.
-   Configurar a AWS CLI e a EB CLI.
-   Criar um ambiente Elastic Beanstalk.
-   Realizar o deploy.
-   Atualizar versões da aplicação.
-   Consultar logs.
-   Entender toda a arquitetura criada automaticamente.

------------------------------------------------------------------------

# Arquitetura

``` text
                 Desenvolvedor
                       │
                 npm start (Local)
                       │
                       ▼
                Elastic Beanstalk CLI
                       │
                       ▼
             Elastic Beanstalk Service
                       │
        ┌──────────────┼───────────────┐
        │              │               │
        ▼              ▼               ▼
   IAM Role      Security Group    Auto Scaling
                       │
                       ▼
      Elastic Load Balancer (opcional)
                       │
                       ▼
                     Amazon EC2
                       │
                       ▼
                  Amazon Linux
                       │
                       ▼
                  Node.js Runtime
                       │
                       ▼
                   Express App
```

------------------------------------------------------------------------

# Pré-requisitos

-   Node.js
-   npm
-   AWS CLI
-   EB CLI

Verificar:

``` bash
node -v
npm -v
aws --version
eb --version
```

------------------------------------------------------------------------

# Criando o projeto

``` bash
mkdir nodejs-example-express-rds
cd nodejs-example-express-rds
npm init -y
npm install express
```

Crie `server.js`:

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

Atualize o `package.json`:

``` json
"scripts": {
  "start": "node server.js"
}
```

------------------------------------------------------------------------

# Testando localmente

``` bash
npm start
```

Abra:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# Estrutura do projeto

``` text
nodejs-example-express-rds/
├── package.json
├── package-lock.json
├── server.js
└── node_modules/
```

------------------------------------------------------------------------

# Configurando o Elastic Beanstalk

``` bash
eb init
```

Informações:

-   Região: us-east-1
-   Nome da aplicação: nodejs-example
-   Plataforma: Node.js

Será criada a pasta:

``` text
.elasticbeanstalk/
```

------------------------------------------------------------------------

# Criando o ambiente

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

# Processo de Deploy

``` bash
eb deploy
```

Fluxo:

``` text
Código
   │
   ▼
Upload para S3
   │
   ▼
Elastic Beanstalk
   │
   ▼
Provisiona/Atualiza EC2
   │
   ▼
Instala dependências
   │
   ▼
Inicia aplicação
   │
   ▼
Aplicação publicada
```

------------------------------------------------------------------------

# Acessando a aplicação

``` bash
eb open
```

Ou localize a EC2:

Elastic Beanstalk → Environment → Resources → EC2 Instance

Visualize:

-   Public IPv4
-   Private IPv4
-   Security Group
-   Instance ID

------------------------------------------------------------------------

# Atualizando a aplicação

Altere o código e execute:

``` bash
eb deploy
```

O Elastic Beanstalk cria uma nova versão da aplicação e realiza a
atualização do ambiente.

------------------------------------------------------------------------

# Logs

``` bash
eb logs
```

Também é possível consultar os logs pelo CloudWatch ou acessando a EC2.

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

# Fluxo completo

``` text
Criar aplicação
      │
      ▼
npm install
      │
      ▼
npm start
      │
      ▼
Teste local
      │
      ▼
eb init
      │
      ▼
eb create
      │
      ▼
Elastic Beanstalk
      │
      ▼
Amazon EC2
      │
      ▼
Aplicação publicada
```

------------------------------------------------------------------------

# Evolução para CI/CD

Após validar o deploy manual, o Elastic Beanstalk pode ser integrado ao
CodePipeline.

``` text
GitHub / CodeCommit
        │
        ▼
CodePipeline
        │
        ▼
CodeBuild (opcional)
        │
        ▼
Elastic Beanstalk
        │
        ▼
Amazon EC2
        │
        ▼
Aplicação atualizada
```

------------------------------------------------------------------------

# Resumo dos principais comandos

  Comando               Finalidade
  --------------------- -------------------------------
  npm init -y           Inicializa o projeto
  npm install express   Instala o Express
  npm start             Executa localmente
  eb init               Configura o Elastic Beanstalk
  eb create             Cria o ambiente
  eb deploy             Publica nova versão
  eb status             Mostra status
  eb health             Mostra saúde do ambiente
  eb logs               Baixa logs
  eb open               Abre a aplicação
  eb terminate          Remove o ambiente
