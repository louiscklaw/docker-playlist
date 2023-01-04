#!/usr/bin/env bash

set -ex

# docker compose up --build

# docker pull bluet/proxybroker2

docker run -it --rm bluet/proxybroker2 find --types HTTP HTTPS |tee http_proxy.txt
# docker run -it --rm bluet/proxybroker2 grab > out_proxy.txt
# docker run -it --rm bluet/proxybroker2 grab  --types HTTP HTTPS > http_proxy.txt
# docker run -it --rm -p 8888:8888 bluet/proxybroker2 serve --host 127.0.0.1 --port 8888 --types HTTP HTTPS --min-queue 5


# # curl https://httpbin.org/ip --proxy http://101.32.184.53:3128
# # curl https://httpbin.org/ip --proxy http://44.200.212.199:3128
# curl https://httpbin.org/ip --proxy http://127.0.0.1:8888
