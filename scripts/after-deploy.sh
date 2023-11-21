#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

export PATH=$PATH:/home/ubuntu/.npm-global/bin/pm2
export PATH=$PATH:/home/ubuntu/.npm-global/bin/yarn

cd $REPOSITORY
git stash         # 현재 변경 사항을 스태시에 보관
git pull origin main  # 원격 저장소에서 변경 사항을 가져옴
git stash pop     # 스태시에 보관한 변경 사항을 다시 적용
cd client
pm2 kill
yarn
pm2 start yarn --name picnic -- start