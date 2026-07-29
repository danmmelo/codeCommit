#!/bin/bash

set -e

echo "==============================="
echo "AfterInstall"
echo "==============================="

cd /home/ec2-user/nodejs-app

echo "Instalando dependências..."

npm ci

echo "Versões:"
node -v
npm -v

echo "Validando dependências..."

npm list express
npm list pino
npm list @aws-sdk/client-ssm
npm list @aws-sdk/client-secrets-manager
npm list @aws-sdk/client-cognito-identity-provider

echo "Validando aplicação..."

test -f server.js

echo "AfterInstall concluído."