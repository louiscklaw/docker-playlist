#!/usr/bin/env bash

set -ex


docker compose -f ./docker-compose-private-changedetect.yml kill
docker compose -f ./docker-compose-private-changedetect.yml down
docker compose -f ./docker-compose-private-changedetect.yml up -d --build --remove-orphans

docker compose -f ./docker-compose-changedetection-io.yml up -d --build --remove-orphans
docker compose -f ./docker-compose-taobao-changedetect.yml up -d --build --remove-orphans

docker compose -f ./docker-compose-carousell-changedetect.yml up -d --build --remove-orphans
