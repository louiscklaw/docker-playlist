#!/usr/bin/env bash

set -ex

docker compose -f ./docker-compose-playwright.yml kill
docker compose -f ./docker-compose-playwright.yml down
docker compose -f ./docker-compose-playwright.yml up -d --build
# docker compose -f ./docker-compose-playwright.yml logs -f

docker compose -f ./docker-compose-changedetection-io.yml kill
docker compose -f ./docker-compose-changedetection-io.yml down
docker compose -f ./docker-compose-changedetection-io.yml up -d --build
# docker compose -f ./docker-compose-changedetection-io.yml logs -f

docker compose -f ./docker-compose-private-changedetect.yml kill
docker compose -f ./docker-compose-private-changedetect.yml down
docker compose -f ./docker-compose-private-changedetect.yml up -d --build
# docker compose -f ./docker-compose-private-changedetect.yml logs -f

pushd carousell
  docker compose kill
  docker compose down
  docker compose up -d --build &
  # docker compose logs -f
popd

pushd taobao
  docker compose kill
  docker compose down
  docker compose up -d --build &
  # docker compose logs -f
popd

sudo chmod 777 -R ./volumes

wait
