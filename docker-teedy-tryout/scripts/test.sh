#!/usr/bin/env bash


set -ex

sudo rm -rf ./volumes

docker compose kill
docker compose rm -v -f
docker compose up -d
docker compose logs -f
