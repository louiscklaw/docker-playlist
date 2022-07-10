#!/usr/bin/env bash

set -ex

docker pull questdb/questdb

docker run -p 9000:9000 \
  -p 9009:9009 \
  -p 8812:8812 \
  -p 9003:9003 \
  -v "$(pwd)/volume/.questdb:/root/.questdb/" \
  questdb/questdb 
  