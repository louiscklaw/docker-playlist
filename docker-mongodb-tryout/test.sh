#!/usr/bin/env bash

set -ex

# sudo rm -rf data

docker compose up -d

docker compose logs -f mongo-express
