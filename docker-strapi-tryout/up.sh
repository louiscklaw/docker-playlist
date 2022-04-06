#!/usr/bin/env bash

set -ex

./build.sh

TMP_DIR=$(mktemp -d)

docker-compose pull
docker-compose up
