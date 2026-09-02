echo "Validando aplicação..."

for i in {1..30}
do
    if curl -fs http://localhost:8080/health > /dev/null
    then
        echo "✔ Aplicação respondeu no endpoint /health"

        pgrep -nf "node server.js" > app.pid

        echo "PID:"
        cat app.pid

        echo "==============================="
        echo "ApplicationStart finalizado"
        echo "==============================="

        exit 0
    fi

    echo "Tentativa $i de 30..."
    sleep 2
done

echo "✘ Aplicação não respondeu no endpoint /health"

echo ""
echo "===== Últimas linhas do log ====="
tail -50 "$LOG_DIR/app.log"

exit 1