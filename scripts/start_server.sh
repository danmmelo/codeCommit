#!/bin/bash

set -e

APP_DIR="/home/ec2-user/nodejs-app"
LOG_DIR="$APP_DIR/logs"

echo "==============================="
echo "Start Server"
echo "==============================="

cd "$APP_DIR"

echo "Criando diretório de logs..."
mkdir -p "$LOG_DIR"

echo "Parando instâncias antigas..."
pkill -f "node server.js" || true

echo "Iniciando aplicação..."
nohup npm start > "$LOG_DIR/app.log" 2>&1 &

echo $! > app.pid

sleep 5

echo "PID da aplicação:"
cat app.pid

echo "Servidor iniciado com sucesso."
