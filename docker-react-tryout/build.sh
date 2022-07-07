#!/usr/bin/env bash

set -ex


docker build -t logickee/wiki-app-tryout wiki
docker image push logickee/wiki-app-tryout