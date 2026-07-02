#!/bin/bash

echo "==============================="
echo "BeforeInstall"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

echo "Validando ambiente..."
bash scripts/validate_environment.sh

echo "Parando aplicação antiga..."
pkill node || true

echo "Criando diretório da aplicação..."
sudo mkdir -p "$APP_DIR"

echo "Removendo arquivos da implantação anterior..."

sudo rm -rf "$APP_DIR/node_modules"
sudo rm -rf "$APP_DIR/package-lock.json"
sudo rm -rf "$APP_DIR/package.json"
sudo rm -rf "$APP_DIR/server.js"
sudo rm -rf "$APP_DIR/scripts"
sudo rm -rf "$APP_DIR/docs"
sudo rm -rf "$APP_DIR/.elasticbeanstalk"
sudo rm -rf "$APP_DIR/README.md"
sudo rm -rf "$APP_DIR/buildspec.yml"
sudo rm -rf "$APP_DIR/appspec.yml"

echo "Diretório limpo."

echo "BeforeInstall finalizado."