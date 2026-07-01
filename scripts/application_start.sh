#!/bin/bash

set -e

echo "==============================="
echo "AfterInstall"
echo "==============================="

cd /home/ec2-user/nodejs-app

echo "Instalando dependências Node..."

npm install

echo "Verificando Express..."

npm list express

echo "AfterInstall concluído."