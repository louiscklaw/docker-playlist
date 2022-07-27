#!/usr/bin/env bash

set -ex

docker-compose kill
docker-compose rm -s -v -f
docker-compose up -d
docker-compose logs -f
