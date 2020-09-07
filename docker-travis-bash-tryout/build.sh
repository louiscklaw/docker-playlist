#!/usr/bin/env bash

set -ex

docker build -t logickee/travis_bash -f dockerfile.1804 . &

wait