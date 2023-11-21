#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

cd $REPOSITORY
git pull
cd client
pm2 kill
yarn install
pm2 start yarn --name picnic -- start