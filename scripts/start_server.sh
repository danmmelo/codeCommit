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
OLD_PIDS=$(pgrep -f "node server.js" || true)

if [ -n "$OLD_PIDS" ]; then
    echo "Processo(s) encontrado(s): $OLD_PIDS"
    kill $OLD_PIDS || true
    sleep 3

    STILL_ALIVE=$(pgrep -f "node server.js" || true)
    if [ -n "$STILL_ALIVE" ]; then
        echo "Ainda vivo(s), forçando com SIGKILL: $STILL_ALIVE"
        kill -9 $STILL_ALIVE || true
        sleep 1
    fi
else
    echo "Nenhum processo antigo encontrado."
fi

echo "Iniciando aplicação..."
nohup npm start > "$LOG_DIR/app.log" 2>&1 &

echo $! > app.pid

sleep 5

echo "PID da aplicação:"
cat app.pid

if ! ps -p "$(cat app.pid)" > /dev/null 2>&1; then
    echo "✘ ERRO: processo não subiu. Últimas linhas do log:"
    tail -30 "$LOG_DIR/app.log"
    exit 1
fi

echo "Servidor iniciado com sucesso."