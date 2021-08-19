#!/usr/bin/env bash

set -ex

docker-compose -p testset1 run jest /bin/bash 
