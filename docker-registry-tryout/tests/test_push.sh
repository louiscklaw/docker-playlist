#!/usr/bin/env bash

set -ex

docker pull ubuntu
docker image tag ubuntu 192.168.10.61:5000/ubuntu
docker push 192.168.10.61:5000/ubuntu


# "insecure-registries":["192.168.99.100:5000"]