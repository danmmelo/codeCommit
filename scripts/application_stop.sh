#!/bin/bash

set -e

echo "==============================="
echo "ApplicationStop"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

cd "$APP_DIR" || exit 0

if [ -f app.pid ]; then

    PID=$(cat app.pid)

    echo "Parando aplicação (PID: $PID)..."

    kill "$PID" || true

    rm -f app.pid

    echo "Aplicação encerrada."

else

    echo "Arquivo app.pid não encontrado."

    pkill -f "node server.js" || true

fi

echo "==============================="
echo "ApplicationStop finalizado"
echo "==============================="