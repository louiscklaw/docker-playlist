#!/usr/bin/env bash

set -ex

docker kill $(docker ps -qa) || true
docker rm $(docker ps -qa) || true

docker run -it \
  -p 29199:9199 \
  -p 29099:9099 \
  -p 29005:9005 \
  -p 29000:9000 \
  -p 28085:8085 \
  -p 28080:8080 \
  -p 25001:5001 \
  -p 25000:5000 \
  -p 24000:4000 \
  --env FIREBASE_TOKEN=$FIREBASE_TOKEN \
  -v $PWD/helloworld-firebase-project:/root \
  --name firebase-tools logickee/docker-firebase  /root/start_fb.sh
