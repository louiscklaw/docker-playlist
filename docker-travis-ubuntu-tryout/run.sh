#!/usr/bin/env bash

set -ex

# ./build.sh

# TMP_DIR=$(mktemp -d)

# docker run -it \
#   --env-file .env.docker \
#   -v $TMP_DIR:/root \
#   -v /var/run/docker.sock:/var/run/docker.sock \
#   --rm \
#   travisci/ci-ubuntu-1804

set -e
DOCKER_TAG=${1:-travisci/ci-ubuntu-1804:packer-1593521720-ca42795e}
docker run --rm --name travis-build -dit \
  --mount type=bind,source=`pwd`,target=/home/travis \
  $DOCKER_TAG /sbin/init

echo "Now run 'su - travis', followed by all the steps from your Travis CI log."
echo "The project is mounted in /home/travis/zero-play."
docker exec -it travis-build bash -l
docker kill travis-build
