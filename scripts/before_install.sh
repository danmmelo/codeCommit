#!/bin/bash

set -e

echo "==============================="
echo "BeforeInstall"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

echo "Parando aplicação..."
pkill -f server.js || true

echo "Criando diretório da aplicação..."
mkdir -p "$APP_DIR"

echo "Limpando implantação anterior (preservando apenas o .env)..."

find "$APP_DIR" \
    -mindepth 1 \
    -maxdepth 1 \
    ! -name ".env" \
    -exec rm -rf {} +

echo "Conteúdo restante:"
ls -la "$APP_DIR"

echo "BeforeInstall finalizado."