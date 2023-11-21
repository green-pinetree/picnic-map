#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

cd $REPOSITORY
git pull
cd client
sudo ln -s /root/.nvm/versions/node/v16.15.1/bin/yarn /usr/bin/yarn
sudo ln -s /root/.nvm/versions/node/v16.15.1/bin/pm2 /usr/bin/pm2
sudo /usr/bin/pm2 kill
sudo /usr/bin/yarn
sudo /usr/bin/pm2 start yarn --name picnic -- start