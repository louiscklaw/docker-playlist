#!/usr/bin/env bash

set -ex

docker build -t logickee/docker-jest-tryout -f dockerfile .

docker push logickee/docker-jest-tryout
