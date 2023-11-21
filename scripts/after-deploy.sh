#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

cd $REPOSITORY
git pull
cd client
sudo pm2 kill
sudo yarn install
sudo pm2 start yarn --name picnic -- start