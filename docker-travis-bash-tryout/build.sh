#!/usr/bin/env bash

set -ex

cd docker-travis-bash-tryout

  docker build -t logickee/travis_bash -f dockerfile.1804 . &

cd ..

wait

docker push logickee/travis_bash &

wait