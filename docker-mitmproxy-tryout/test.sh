#!/usr/bin/env bash

set -ex

http_proxy=http://192.168.10.61:8095/ curl http://example.com/

# https_proxy=https://192.168.10.61:8095/ curl https://example.com/
