#!/usr/bin/env bash

set -ex


docker build -t logickee/wiki-app-tryout wiki
docker image push logickee/wiki-app-tryout

docker build -t logickee/restaurant-cms-tryout restaurant_cms
docker image push logickee/restaurant-cms-tryout