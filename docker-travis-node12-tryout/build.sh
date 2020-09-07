#!/usr/bin/env bash

set -ex

docker build -t logickee/travis_node12 -f dockerfile . &

wait