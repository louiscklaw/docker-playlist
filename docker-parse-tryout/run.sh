#!/usr/bin/env bash

set -ex

./build.sh

TMP_DIR=$(mktemp -d)

docker run -it \
  --env-file .env.docker \
  -v $TMP_DIR:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --rm \
  logickee/travis_python
