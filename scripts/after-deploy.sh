#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

cd $REPOSITORY
git pull
cd client
npm install -g pm2@latest
npm install -g yarn
pm2 kill
yarn install
pm2 start yarn --name picnic -- start