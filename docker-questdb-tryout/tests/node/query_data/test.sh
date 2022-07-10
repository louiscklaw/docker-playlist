#!/usr/bin/env bash

set -ex

curl -G --data-urlencode \
    "query=SELECT * FROM trades LIMIT 3" \
    http://localhost:9000/exp
