#!/usr/bin/env bash

set -ex

docker build -t logickee/docker-react-tryout -f dockerfile .

docker push logickee/docker-react-tryout
