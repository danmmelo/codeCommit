#!/bin/bash

echo "Instalando dependências..."

install_if_missing () {

PACKAGE=$1

if ! command -v $PACKAGE >/dev/null 2>&1
then

    echo "Instalando $PACKAGE"

    sudo yum install $PACKAGE -y

else

    echo "$PACKAGE já instalado"

fi

}

install_if_missing git
install_if_missing wget
install_if_missing unzip
install_if_missing ruby