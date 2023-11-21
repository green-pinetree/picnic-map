#!/bin/bash
REPOSITORY=/home/ubuntu/picnic-map

cd $REPOSITORY
git stash         # 현재 변경 사항을 스태시에 보관
git pull origin main  # 원격 저장소에서 변경 사항을 가져옴
git stash pop     # 스태시에 보관한 변경 사항을 다시 적용
cd client
/home/ubuntu/.npm-global/bin/pm2 kill
/home/ubuntu/.npm-global/bin/yarn
/home/ubuntu/.npm-global/bin/pm2 start yarn --name picnic -- start