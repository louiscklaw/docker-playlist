#!/usr/bin/env bash

set -ex

docker build -t logickee/docker_node16_tryout -f dockerfile.node16 .

docker run -it -v .:/root -v /var/run/docker.sock:/var/run/docker.sock --rm logickee/docker_node16_tryout /bin/bash

docker push logickee/docker_node16_tryout
