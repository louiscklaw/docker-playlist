#!/usr/bin/env bash

set -ex

cd docker-travis-node12-tryout

  docker build -t logickee/travis_node12 -f dockerfile . &

cd ..

wait

docker push logickee/travis_node12 &

wait