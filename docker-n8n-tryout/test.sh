#!/usr/bin/env bash

set -ex

rm -rf ~/.n8n

docker-compose kill 
docker-compose up -d n8n
docker-compose logs -f