#!/bin/bash

set -e

echo "==============================="
echo "BeforeInstall"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

echo "Validando ambiente..."
bash scripts/validate_environment.sh

echo "Parando aplicação..."
pkill -f server.js || true

echo "Criando diretório..."

mkdir -p "$APP_DIR"

echo "Limpando implantação anterior..."

find "$APP_DIR" \
    -mindepth 1 \
    -maxdepth 1 \
    ! -name ".env" \
    -exec rm -rf {} +

echo "BeforeInstall finalizado."