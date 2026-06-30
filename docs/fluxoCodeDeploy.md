# Fluxo de Deploy com AWS CodeDeploy

## Visão Geral

O CodeDeploy executa uma sequência de etapas para implantar a aplicação em uma instância EC2.

```text
                +--------------------+
                |  CodeDeploy Start  |
                +---------+----------+
                          |
                          v
                +--------------------+
                | Download Revision  |
                | (ZIP da aplicação) |
                +---------+----------+
                          |
                          v
                +---------------------------+
                |      BeforeInstall        |
                +---------------------------+
                | validate_environment.sh   |
                | install_dependencies.sh   |
                +---------+-----------------+
                          |
                          v
                +---------------------------+
                |   Copia arquivos para     |
                | /home/ec2-user/nodejs-app |
                +---------+-----------------+
                          |
                          v
                +---------------------------+
                |      AfterInstall         |
                +---------------------------+
                | npm install               |
                +---------+-----------------+
                          |
                          v
                +---------------------------+
                |    ApplicationStart       |
                +---------------------------+
                | npm start                 |
                +---------+-----------------+
                          |
                          v
                +---------------------------+
                |     ValidateService       |
                +---------------------------+
                | curl localhost:8080       |
                +---------+-----------------+
                          |
                +---------+----------+
                |                    |
             Sucesso             Falha
                |                    |
                v                    v
     Deployment Successful   Deployment Failed
```

---

# Descrição de cada etapa

## 1. Download Revision

O CodeDeploy baixa o pacote da aplicação (ZIP) armazenado no S3 ou GitHub e extrai o conteúdo na instância EC2.

---

## 2. BeforeInstall

Executa tarefas de preparação do ambiente antes da instalação da aplicação.

Scripts executados:

- `validate_environment.sh`
- `install_dependencies.sh`

### Objetivos

- Verificar se Node.js está instalado
- Verificar npm
- Verificar Git
- Verificar Java
- Verificar Ruby
- Verificar wget
- Verificar unzip

Caso algum componente esteja ausente, ele será instalado automaticamente.

---

## 3. Cópia dos arquivos

Após preparar o ambiente, o CodeDeploy copia todos os arquivos da aplicação para:

```text
/home/ec2-user/nodejs-app
```

---

## 4. AfterInstall

Nesta etapa são instaladas as dependências da aplicação.

Script executado:

```bash
npm install
```

O npm baixa todas as bibliotecas descritas no `package.json`.

---

## 5. ApplicationStart

Inicia a aplicação Node.js.

Exemplo:

```bash
pkill node || true

npm start
```

Caso exista um processo Node anterior, ele será encerrado antes da nova execução.

---

## 6. ValidateService

Verifica se a aplicação realmente iniciou.

Exemplo:

```bash
curl http://localhost:8080
```

Se a resposta for positiva:

```text
Aplicação funcionando.
```

Caso contrário:

```text
Deployment Failed
```

---

# Fluxo resumido

```text
CodeDeploy

↓

Download da aplicação

↓

BeforeInstall
│
├── validate_environment.sh
└── install_dependencies.sh

↓

Copia arquivos

↓

AfterInstall
│
└── npm install

↓

ApplicationStart
│
└── npm start

↓

ValidateService
│
└── curl localhost:8080

↓

Deployment Successful
```

---

# Estrutura do projeto

```text
nodejs-example-express-rds/

├── appspec.yml
├── package.json
├── package-lock.json
├── server.js
│
├── scripts/
│   ├── before_install.sh
│   ├── validate_environment.sh
│   ├── install_dependencies.sh
│   ├── after_install.sh
│   ├── application_start.sh
│   └── validate_service.sh
│
└── public/
```

---

# Benefícios dessa abordagem

- Organização dos scripts por responsabilidade.
- Validação automática do ambiente antes do deploy.
- Instala apenas dependências ausentes.
- Evita reinstalações desnecessárias.
- Facilita troubleshooting.
- Estrutura semelhante à utilizada em ambientes corporativos.
- Processo de deploy totalmente automatizado.