#!/bin/bash

echo "==============================="
echo "ApplicationStop"
echo "==============================="

echo "Verificando aplicação Node.js..."

pkill -f node || true

echo "Aplicação encerrada."