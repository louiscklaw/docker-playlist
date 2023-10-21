#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_node20_tryout -f dockerfile.node20 .

docker run -it --env-file .env.docker -v .:/root -v /var/run/docker.sock:/var/run/docker.sock --rm logickee/docker_node20_tryout /bin/bash
