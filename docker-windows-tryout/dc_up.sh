#!/usr/bin/env bash

set -x
docker compose kill
docker compose down

docker compose up

# sudo rm -rf volumes/elasticsearch/data/*

# set -ex

# sudo sysctl -w vm.max_map_count=262144

# # docker compose build
# docker compose up --force-recreate
