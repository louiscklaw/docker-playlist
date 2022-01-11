#!/usr/bin/env bash

set -ex

docker build -t logickee/ubuntu_2010 -f dockerfile.2104 . &
docker build -t logickee/ubuntu_2010 -f dockerfile.2010 . &
docker build -t logickee/ubuntu_2004 -f dockerfile.2004 . &
docker build -t logickee/ubuntu_1804 -f dockerfile.1804 . &
docker build -t logickee/ubuntu_1604 -f dockerfile.1604 . &
docker build -t logickee/ubuntu_1404 -f dockerfile.1404 . &

wait

docker push logickee/ubuntu_2104 &
docker push logickee/ubuntu_2010 &
docker push logickee/ubuntu_2004 &
docker push logickee/ubuntu_1804 &
docker push logickee/ubuntu_1604 &
docker push logickee/ubuntu_1404 &

wait
