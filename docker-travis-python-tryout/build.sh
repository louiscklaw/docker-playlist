#!/usr/bin/env bash

set -ex

docker build -t logickee/travis_python -f dockerfile.1804 . &

wait