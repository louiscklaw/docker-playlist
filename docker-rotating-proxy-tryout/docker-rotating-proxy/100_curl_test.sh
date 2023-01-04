#!/usr/bin/env bash

# ./public_proxy_cron.sh
# sleep 5

# set -ex


for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
  curl https://httpbin.org/ip --proxy http://127.0.0.1:3128
  sleep 10
done
