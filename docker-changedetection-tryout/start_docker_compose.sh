#!/usr/bin/env bash

set -ex


docker compose -f ./docker-compose-changedetection-io.yml up -d --build
docker compose -f ./docker-compose-taobao-changedetect.yml up -d --build
docker compose -f ./docker-compose-private-changedetect.yml up -d --build
docker compose -f ./docker-compose-carousell-changedetect.yml up -d --build
