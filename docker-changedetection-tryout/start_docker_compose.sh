#!/usr/bin/env bash

set -ex

pushd debug
  docker compose kill
  docker compose down
  docker compose up -d --build &
  # docker compose logs -f
popd

pushd private-changedetect
  docker compose kill
  docker compose down
  docker compose up -d --build &
  # docker compose logs -f
popd

# pushd carousell
#   docker compose kill
#   docker compose down
#   docker compose up -d --build &
#   # docker compose logs -f
# popd

# pushd taobao
#   docker compose kill
#   docker compose down
#   docker compose up -d --build &
#   # docker compose logs -f
# popd

sudo chmod 777 -R ./volumes

wait
