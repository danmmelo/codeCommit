#!/bin/bash

set -e

echo "==============================="
echo "ApplicationStart"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"
LOG_DIR="$APP_DIR/logs"

cd "$APP_DIR"

echo "Diretório atual:"
pwd

echo "Criando diretório de logs..."
mkdir -p "$LOG_DIR"

echo "Parando aplicação anterior..."
pkill -f "node server.js" || true

echo "Iniciando aplicação..."

nohup npm start > "$LOG_DIR/app.log" 2>&1 &

echo "Aguardando aplicação iniciar..."
sleep 10

echo "Validando aplicação..."

if ! pgrep -f "node server.js" > /dev/null
then
    echo "✘ Aplicação não iniciou."

    echo ""
    echo "===== Últimas linhas do log ====="
    tail -50 "$LOG_DIR/app.log"

    exit 1
fi

echo "PID da aplicação:"
pgrep -f "node server.js" | head -1 > app.pid
cat app.pid

echo "✔ Aplicação iniciada com sucesso."

echo "==============================="
echo "ApplicationStart finalizado"
echo "==============================="