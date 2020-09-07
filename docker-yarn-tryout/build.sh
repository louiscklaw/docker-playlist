#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_yarn_tryout -f dockerfile . &

wait


docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/docker_yarn_tryout \
  node --version

docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/docker_yarn_tryout \
  npm --version

docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/docker_yarn_tryout \
  yarn --version
