#!/usr/bin/env bash

set -ex

docker-compose kill
docker-compose rm -s -v -f
docker system prune -f
docker container prune -f

yarn gitSync
yarn docker_rebuild
docker-compose logs -f
