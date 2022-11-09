#!/usr/bin/env bash

set -ex


# docker compose -f ./docker-compose-private-changedetect.yml kill
# docker compose -f ./docker-compose-private-changedetect.yml down
# docker compose -f ./docker-compose-private-changedetect.yml up -d --build

# docker compose -f ./docker-compose-changedetection-io.yml kill
# docker compose -f ./docker-compose-changedetection-io.yml down
# docker compose -f ./docker-compose-changedetection-io.yml up -d --build

# docker compose -f ./docker-compose-taobao-changedetect.yml kill
# docker compose -f ./docker-compose-taobao-changedetect.yml down
# docker compose -f ./docker-compose-taobao-changedetect.yml up -d --build

# docker compose -f ./docker-compose-carousell-changedetect.yml kill
# docker compose -f ./docker-compose-carousell-changedetect.yml down
# docker compose -f ./docker-compose-carousell-changedetect.yml up -d --build

docker compose -f ./docker-compose-playwright.yml kill

sleep 1

docker compose -f ./docker-compose-playwright.yml down

sleep 1

docker compose -f ./docker-compose-playwright.yml up -d --build
