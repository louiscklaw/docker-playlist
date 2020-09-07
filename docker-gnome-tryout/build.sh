#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_gnome -f dockerfile . &

wait