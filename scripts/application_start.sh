#!/bin/bash

set -e

echo "==============================="
echo "ApplicationStart"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

cd $APP_DIR

echo "Diretório atual:"
pwd

echo "Parando qualquer processo Node antigo..."
pkill -f "node server.js" || true

echo "Iniciando aplicação..."

nohup npm start > app.log 2>&1 &

echo "Aguardando aplicação iniciar..."
sleep 10

echo "Verificando processo..."

if pgrep -f "node server.js" > /dev/null
then
    echo "✔ Aplicação iniciada com sucesso."
else
    echo "✘ Aplicação não iniciou."
    echo "===== app.log ====="
    cat app.log
    exit 1
fi

echo "==============================="
echo "ApplicationStart finalizado"
echo "==============================="