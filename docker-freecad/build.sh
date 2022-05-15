#!/usr/bin/env bash

set -ex

docker build -t logickee/docker-freecad -f dockerfile . &

wait