#!/bin/bash

set -e

echo "========================================"
echo "InstallDependencies"
echo "========================================"

install_if_missing () {

    PACKAGE=$1

    if ! command -v "$PACKAGE" >/dev/null 2>&1
    then
        echo "Instalando $PACKAGE..."

        case "$PACKAGE" in

            git)
                sudo yum install -y git
                ;;

            wget)
                sudo yum install -y wget
                ;;

            unzip)
                sudo yum install -y unzip
                ;;

            ruby)
                sudo yum install -y ruby
                ;;

            node)
                echo "Instalando Node.js..."

                curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

                sudo yum install -y nodejs
                ;;

            npm)
                echo "O npm é instalado junto com o Node.js."
                ;;

            *)
                echo "Pacote $PACKAGE não suportado."
                ;;
        esac

    else

        echo "✔ $PACKAGE já instalado."

    fi
}

install_if_missing git
install_if_missing wget
install_if_missing unzip
install_if_missing ruby
install_if_missing node
install_if_missing npm

echo ""
echo "========================================"
echo "Versões instaladas"
echo "========================================"

git --version || true
wget --version | head -1 || true
ruby --version || true
node --version || true
npm --version || true

echo ""
echo "========================================"
echo "InstallDependencies finalizado."
echo "========================================"