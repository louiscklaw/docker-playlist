#!/usr/bin/env bash

set -ex

# ./build.sh

# TMP_DIR=$(mktemp -d)

# -v $TMP_DIR:/root \
docker run -it \
  --env GITHUB_TOKEN=$TEST_GITHUB_TOKEN \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $PWD/_workspace:/home/logic/_workspace \
  -v $PWD/entry.sh:/root/entry.sh \
  --rm \
  logickee/docker-jest-tryout \
  /bin/bash

# docker run -it \
#   --env-file .env.docker \
#   -v $TMP_DIR:/root \
#   -v /var/run/docker.sock:/var/run/docker.sock \
#   --rm \
#   logickee/travis_node \
#   npm --version
