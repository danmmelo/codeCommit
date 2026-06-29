# Laboratório AWS Elastic Beanstalk com Node.js e Express

## Objetivo

Neste laboratório você irá:

- Criar uma aplicação Node.js utilizando Express.
- Testar a aplicação localmente.
- Configurar o Elastic Beanstalk.
- Criar um ambiente na AWS.
- Realizar o deploy da aplicação.
- Acessar a aplicação publicada na Internet.

---

# Arquitetura

```text
Node.js + Express
        │
        ▼
Elastic Beanstalk
        │
        ▼
EC2
        │
        ▼
Aplicação Web
```

Posteriormente esta arquitetura poderá ser integrada com:

```text
CodeCommit
      │
      ▼
CodePipeline
      │
      ▼
CodeBuild
      │
      ▼
Elastic Beanstalk
```

---

# Pré-requisitos

Instalar:

- Node.js
- npm
- AWS CLI
- EB CLI (Elastic Beanstalk CLI)

Verificar a instalação:

```bash
node -v
npm -v
aws --version
eb --version
```

---

# Etapa 1 - Criar o projeto

Criar a pasta do projeto.

```bash
mkdir nodejs-example-express-rds
```

Entrar na pasta.

```bash
cd nodejs-example-express-rds
```

Inicializar o projeto Node.

```bash
npm init -y
```

---

# Etapa 2 - Instalar o Express

```bash
npm install express
```

---

# Etapa 3 - Criar o arquivo da aplicação

Criar o arquivo:

```text
server.js
```

Conteúdo:

```javascript
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

---

# Etapa 4 - Configurar o package.json

Adicionar o script de inicialização.

```json
"scripts": {
    "start": "node server.js"
}
```

Exemplo:

```json
{
  "name": "nodejs-example-express-rds",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",

  "scripts": {
    "start": "node server.js"
  },

  "dependencies": {
    "express": "^5.1.0"
  }
}
```

---

# Etapa 5 - Testar localmente

Executar:

```bash
npm start
```

Abrir:

```
http://localhost:8080
```

Resultado esperado:

```
Hello Elastic Beanstalk!
```

---

# Estrutura do projeto

```text
nodejs-example-express-rds
│
├── package.json
├── package-lock.json
├── server.js
└── node_modules/
```

---

# Etapa 6 - Inicializar o Elastic Beanstalk

Executar:

```bash
eb init
```

Informar:

## Região

```
us-east-1
```

## Nome da aplicação

```
nodejs-example
```

## Plataforma

```
Node.js
```

Após a configuração será criada a pasta:

```text
.elasticbeanstalk/
```

---

# Estrutura após o eb init

```text
nodejs-example-express-rds
│
├── .elasticbeanstalk/
├── node_modules/
├── package.json
├── package-lock.json
└── server.js
```

---

# Etapa 7 - Criar o ambiente

Executar:

```bash
eb create nodejs-env
```

O Elastic Beanstalk criará automaticamente:

- EC2
- Security Group
- IAM Role
- Auto Scaling Group
- Elastic Load Balancer (quando necessário)

---

# Etapa 8 - Abrir a aplicação

Executar:

```bash
eb open
```

Será aberta uma URL semelhante a:

```
http://nodejs-env.us-east-1.elasticbeanstalk.com
```

---

# Comandos úteis

Verificar o status:

```bash
eb status
```

Visualizar os logs:

```bash
eb logs
```

Publicar uma nova versão:

```bash
eb deploy
```

Abrir a aplicação:

```bash
eb open
```

Encerrar o ambiente:

```bash
eb terminate
```

---

# Fluxo completo

```text
Criar aplicação
        │
        ▼
npm install
        │
        ▼
npm start
        │
        ▼
Teste Local
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
EC2
        │
        ▼
Aplicação Publicada
```

---

# Próxima evolução

Após validar o deploy manual, é possível automatizar todo o processo utilizando CI/CD.

```text
Git Push
      │
      ▼
CodeCommit
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
Aplicação Atualizada
```

---

# Resumo dos principais comandos

| Comando | Função |
|----------|--------|
| `npm init -y` | Inicializa o projeto Node.js |
| `npm install express` | Instala o Express |
| `npm start` | Executa a aplicação localmente |
| `eb init` | Configura o projeto para o Elastic Beanstalk |
| `eb create` | Cria um ambiente no Elastic Beanstalk |
| `eb status` | Exibe o status do ambiente |
| `eb logs` | Obtém os logs da aplicação |
| `eb deploy` | Publica uma nova versão da aplicação |
| `eb open` | Abre a URL da aplicação |
| `eb terminate` | Remove o ambiente do Elastic Beanstalk | 

```test
Seu código
      │
      ▼
Elastic Beanstalk
      │
      ▼
Cria uma EC2
      │
      ▼
Instala Node.js
      │
      ▼
Executa sua aplicação
      │
      ▼
Disponibiliza uma URL pública
```