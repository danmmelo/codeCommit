#!/bin/bash

echo "Validando ambiente..."

check_package () {

PACKAGE=$1

if command -v $PACKAGE >/dev/null 2>&1
then
    echo "✔ $PACKAGE instalado"
else
    echo "✘ $PACKAGE NÃO instalado"
fi

}

check_package node
check_package npm
check_package git
check_package wget
check_package ruby
check_package java
check_package unzip