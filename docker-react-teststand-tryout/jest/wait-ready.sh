#!/usr/bin/env bash

set -ex

/wait-for-it.sh react:8002 -t 0

/wait-for-it.sh firebase:4000 -t 0