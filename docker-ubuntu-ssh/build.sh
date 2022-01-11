#!/usr/bin/env bash

set -ex

docker-compose pull
docker-compose build

docker-compose kill
docker-compose down -v

docker-compose up -d
