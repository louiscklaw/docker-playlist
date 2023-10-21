#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_node12_tryout -f dockerfile.node12 . &

wait

docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/docker_node12_tryout \
  node --version

docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/docker_node12_tryout \
  npm --version
