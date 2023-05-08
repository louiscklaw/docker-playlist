#!/usr/bin/env bash

set -ex

docker build . -t test

echo "http://localhost:6911/?password=my-pw"

docker run -it --user 0 -p 6911:6901 -e VNC_PW=my-pw test
