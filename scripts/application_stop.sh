#!/bin/bash

set -e

echo "========================================"
echo "ApplicationStop Hook"
echo "========================================"

echo "Verificando se existe uma aplicação Node.js em execução..."

if pgrep -f "node" > /dev/null; then
    echo "Aplicação Node.js encontrada."

    echo "Encerrando processos Node.js..."

    pkill -f "node"

    sleep 5

    echo "Aplicação encerrada com sucesso."

else
    echo "Nenhuma aplicação Node.js em execução."
fi

echo "ApplicationStop concluído."