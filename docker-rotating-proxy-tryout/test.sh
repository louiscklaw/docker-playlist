#!/usr/bin/env bash

set -ex

# curl --proxy 127.0.0.1:5566 https://api.my-ip.io/ip

for ((i = 0 ; i < 100 ; i++)); do
  curl --proxy 192.168.10.61:5566 https://api.my-ip.io/ip
done
