#!/usr/bin/env bash

docker network prune
docker network create test_compose_network --subnet 172.24.24.0/24

pushd docker-compose-test-1
  docker-compose build
popd

for ((i = 0 ; i < 9 ; i++)); do
  echo building $i copy

  pushd docker-compose-test-1
    export PUBLIC_PORT=808$i 
    # echo $PUBLIC_PORT
    docker-compose build
    docker-compose -p test$i up -d 
  popd
done

