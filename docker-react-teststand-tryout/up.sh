#!/usr/bin/env bash

set -ex

docker-compose -p testset1 up -d
docker-compose -p testset2 up -d
