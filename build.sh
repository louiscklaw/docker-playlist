#!/usr/bin/env bash

set -ex

docker-github-ubuntu/build.sh &

docker-github-python-tryout/build.sh &

docker-travis-bash-tryout/build.sh &

docker-travis-node12-tryout/build.sh &

wait
