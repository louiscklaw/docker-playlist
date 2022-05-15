#!/usr/bin/env bash

set -ex

./build.sh

TMP_DIR=$(mktemp -d)

docker-compose kill 

docker-compose pull
docker-compose down

docker-compose up  -d
