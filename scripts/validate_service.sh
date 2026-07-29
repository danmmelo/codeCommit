#!/bin/bash

set -e

echo "==============================="
echo "ValidateService"
echo "==============================="

URL="http://localhost:8080/health"

echo "Validando aplicação..."

for i in {1..15}
do

    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL" || true)

    if [ "$STATUS" = "200" ]; then

        echo "✔ Aplicação funcionando."

        exit 0

    fi

    echo "Tentativa $i: aplicação ainda não respondeu."

    sleep 2

done

echo ""
echo "✘ Aplicação não respondeu."

echo "===== Últimas linhas do log ====="

tail -50 /home/ec2-user/nodejs-app/logs/app.log || true

exit 1