#!/usr/bin/env bash

set -ex

docker-compose -p testset1 run jest /bin/bash 
docker-compose -p testset2 run jest /bin/bash 
