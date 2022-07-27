#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_nest16_tryout -f dockerfile.nest16 . 

docker push logickee/docker_nest16_tryout