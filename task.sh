#!/usr/bin/env bash

set -ex


docker run -it -p 8118:8118 -p 9050:9050 -e TZ=EST5EDT -d dperson/torproxy
