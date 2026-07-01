# LAB - Permissões IAM entre os Serviços da Pipeline AWS

## Objetivo

Este documento resume as permissões IAM normalmente necessárias entre os
serviços de uma pipeline AWS.

## Fluxo

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
Elastic Beanstalk  OU  CodeDeploy
        │
        ▼
Amazon EC2
```

## Permissões por etapa

### GitHub / CodeCommit → CodePipeline

-   codeconnections:GetConnection
-   codeconnections:UseConnection

### CodePipeline → Amazon S3

-   s3:GetBucketVersioning
-   s3:GetBucketAcl
-   s3:GetBucketLocation
-   s3:GetObject
-   s3:GetObjectVersion
-   s3:PutObject
-   s3:PutObjectAcl

### CodePipeline → CodeBuild

-   codebuild:StartBuild
-   codebuild:BatchGetBuilds

O CodeBuild executa o arquivo `buildspec.yml`.

### CodePipeline → Elastic Beanstalk

-   elasticbeanstalk:CreateApplicationVersion
-   elasticbeanstalk:UpdateEnvironment
-   elasticbeanstalk:DescribeApplications
-   elasticbeanstalk:DescribeEnvironments
-   elasticbeanstalk:DescribeEvents

### CodePipeline → CodeDeploy

-   codedeploy:CreateDeployment
-   codedeploy:RegisterApplicationRevision
-   codedeploy:GetApplication
-   codedeploy:GetApplicationRevision
-   codedeploy:GetDeployment
-   codedeploy:GetDeploymentGroup
-   codedeploy:GetDeploymentConfig

O CodeDeploy Agent executa o `appspec.yml`.

### IAM

Frequentemente também é necessário:

-   iam:PassRole

## Resumo

  --------------------------------------------------------------------------------
  Origem                  Destino                 Permissões principais
  ----------------------- ----------------------- --------------------------------
  GitHub/CodeCommit       CodePipeline            codeconnections:GetConnection,
                                                  codeconnections:UseConnection

  CodePipeline            S3                      s3:GetObject, s3:PutObject,
                                                  GetBucket\*

  CodePipeline            CodeBuild               codebuild:StartBuild,
                                                  codebuild:BatchGetBuilds

  CodePipeline            Elastic Beanstalk       CreateApplicationVersion,
                                                  UpdateEnvironment

  CodePipeline            CodeDeploy              CreateDeployment,
                                                  RegisterApplicationRevision

  CodeDeploy              EC2                     CodeDeploy Agent executa
                                                  appspec.yml

  Elastic Beanstalk       EC2                     Gerencia infraestrutura e deploy

  Serviços AWS            IAM                     iam:PassRole (quando necessário)
  --------------------------------------------------------------------------------
