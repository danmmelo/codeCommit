# Fluxo de CI/CD com Elastic Beanstalk

## Visão Geral

Este documento descreve o fluxo de uma aplicação utilizando
GitHub/CodeCommit, CodePipeline, CodeBuild (opcional) e Elastic
Beanstalk, indicando quem executa cada etapa.

## Arquitetura

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
    ├── Instala dependências
    ├── Executa testes
    ├── Compila a aplicação (quando necessário)
    ├── Executa validações
    └── Gera o artefato de deploy
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
        │                           ├── BeforeInstall
        │                           ├── AfterInstall
        │                           ├── ApplicationStart
        │                           ├── ValidateService
        │                           └── Finaliza o deploy
        │
        ├── Recebe o artefato
        ├── Na primeira criação do ambiente:
        │     ├── EC2
        │     ├── IAM Role
        │     ├── Security Group
        │     ├── Auto Scaling Group
        │     ├── Load Balancer
        │     ├── CloudWatch
        │     └── Plataforma Node.js/Java/Python
        │
        ├── Em novos deploys:
        │     ├── Atualiza a aplicação
        │     ├── Reinicia a aplicação
        │     └── Executa Health Checks
        │
        ▼                           ▼
      Amazon EC2               Amazon EC2
        │                           │
        └──────────────┬────────────┘
                       ▼
           Aplicação disponível aos usuários
```

## Quem executa o quê?

  -----------------------------------------------------------------------
  Serviço                             Executa
  ----------------------------------- -----------------------------------
  GitHub / CodeCommit                 Armazena o código

  CodePipeline                        Orquestra a esteira

  CodeBuild                           Executa o `buildspec.yml`, testes e
                                      build

  Elastic Beanstalk                   Provisiona infraestrutura (na
                                      criação) e realiza o deploy

  CodeDeploy                          Coordena o deploy em infraestrutura
                                      existente

  CodeDeploy Agent                    Executa os hooks do `appspec.yml`
  -----------------------------------------------------------------------

## Opções de Deploy

### Elastic Beanstalk

``` text
GitHub
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
EC2
   │
   ▼
Aplicação
```

**Observação:** Se houver CodeBuild, ele executa o `buildspec.yml`. Sem
CodeBuild, esse arquivo não é utilizado.

### CodeDeploy

``` text
GitHub
   │
   ▼
CodePipeline
   │
   ▼
CodeBuild
   │
   ▼
CodeDeploy
   │
   ▼
CodeDeploy Agent
   │
   ├── BeforeInstall
   ├── AfterInstall
   ├── ApplicationStart
   └── ValidateService
   │
   ▼
EC2
   │
   ▼
Aplicação
```

**Observação:** O CodeBuild executa o `buildspec.yml` e o CodeDeploy
Agent executa o `appspec.yml`.
