#!/usr/bin/env bash

set -ex

docker system prune -f
docker image prune -f
docker volume prune -f
