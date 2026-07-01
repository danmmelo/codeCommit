#!/bin/bash

echo "==============================="
echo "BeforeInstall"
echo "==============================="

bash scripts/validate_environment.sh

echo "Parando aplicação antiga..."
pkill node || true

mkdir -p /home/ec2-user/nodejs-app

echo "BeforeInstall finalizado."