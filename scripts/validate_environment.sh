#!/bin/bash

set -e

echo "==============================="
echo "Validate Environment"
echo "==============================="

check_package () {

PACKAGE=$1

if command -v "$PACKAGE" >/dev/null 2>&1
then
    echo "✔ $PACKAGE instalado"
else
    echo "✘ $PACKAGE NÃO instalado"
    exit 1
fi

}

check_package git
check_package wget
check_package unzip
check_package ruby
check_package java
check_package node
check_package npm
check_package aws

echo ""
echo "Versões"

node -v
npm -v
git --version
java -version
ruby --version
aws --version

echo ""
echo "Validando IAM Role..."

aws sts get-caller-identity

echo ""
echo "Ambiente validado com sucesso."