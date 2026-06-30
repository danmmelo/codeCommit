# LAB-Elastic-Beanstalk

## Objetivo

Neste laboratório você irá:

-   Criar uma aplicação Node.js utilizando Express.
-   Testar a aplicação localmente.
-   Configurar o AWS Elastic Beanstalk.
-   Criar um ambiente na AWS.
-   Realizar o deploy da aplicação.
-   Acessar a aplicação publicada.

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
 Elastic Load Balancer (quando necessário)
        │
        ▼
       EC2
        │
        ▼
 Amazon Linux
        │
        ▼
 Node.js Runtime
        │
        ▼
 Aplicação Express
```

------------------------------------------------------------------------

# Pré-requisitos

-   Node.js
-   npm
-   AWS CLI
-   EB CLI

Verifique:

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

Atualize o `package.json`:

``` json
"scripts": {
  "start": "node server.js"
}
```

Teste localmente:

``` bash
npm start
```

Acesse:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# Inicializando o Elastic Beanstalk

``` bash
eb init
```

Informe:

-   Região: `us-east-1`
-   Nome da aplicação: `nodejs-example`
-   Plataforma: `Node.js`

------------------------------------------------------------------------

# Criando o ambiente

``` bash
eb create nodejs-env
```

O Elastic Beanstalk cria automaticamente:

-   EC2
-   Security Group
-   IAM Role
-   Auto Scaling Group
-   Elastic Load Balancer (quando necessário)
-   CloudWatch
-   Bucket S3

------------------------------------------------------------------------

# Deploy

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
EC2
   │
   ▼
npm install
   │
   ▼
npm start
   │
   ▼
Aplicação publicada
```

------------------------------------------------------------------------

# Acessando a aplicação

``` bash
eb open
```

Ou obtenha o IP público da EC2 em:

Elastic Beanstalk → Environment → Resources → EC2 Instance

------------------------------------------------------------------------

# Comandos úteis

``` bash
eb status
eb logs
eb deploy
eb open
eb terminate
```

------------------------------------------------------------------------

# Evolução

``` text
GitHub / CodeCommit
        │
        ▼
CodePipeline
        │
        ▼
CodeBuild
        │
        ▼
Elastic Beanstalk
        │
        ▼
EC2
        │
        ▼
Aplicação publicada
```

------------------------------------------------------------------------

# Próximo laboratório

AWS CodeDeploy com:

-   appspec.yml
-   Hooks
-   BeforeInstall
-   AfterInstall
-   ApplicationStart
-   ValidateService
