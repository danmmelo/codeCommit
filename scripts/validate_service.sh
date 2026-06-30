#!/bin/bash

sleep 10

curl http://localhost:8080

if [ $? -eq 0 ]
then

    echo "Aplicação funcionando."

    exit 0

else

    echo "Aplicação não respondeu."

    exit 1

fi