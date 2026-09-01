#!/bin/bash

set -e

echo "==============================="
echo "GenerateEnv"
echo "==============================="

APP_DIR="/home/ec2-user/nodejs-app"

cat > "$APP_DIR/.env" << 'EOF'
PORT=8080
AWS_REGION=us-east-1
COGNITO_SECRET_NAME=lab/cognito
SQS_QUEUE_URL_PARAM=/inventory-service/prod/sqs/secret-created-queue-url
EOF

echo ".env gerado pelo deploy:"
cat "$APP_DIR/.env"

echo "GenerateEnv finalizado."