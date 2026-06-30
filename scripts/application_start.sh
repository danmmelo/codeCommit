#!/bin/bash

cd /home/ec2-user/nodejs-app

pkill node || true

npm start