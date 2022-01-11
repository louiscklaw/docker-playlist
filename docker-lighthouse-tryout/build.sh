#!/usr/bin/env bash

set -ex

docker build -t logickee/lighthouse -f dockerfile.2004 . &

wait

docker push logickee/lighthouse &

wait
