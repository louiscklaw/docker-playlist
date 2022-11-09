#!/usr/bin/env bash

set -ex


docker compose -f ./docker-compose-changedetection-io.yml start
docker compose -f ./docker-compose-taobao-changedetect.yml start
docker compose -f ./docker-compose-private-changedetect.yml start
docker compose -f ./docker-compose-carousell-changedetect.yml start
