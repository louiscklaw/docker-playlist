#!/usr/bin/env bash

docker run -d \
  -p 8080:80 \
  -v $PWD/my-conf.yml:/app/public/conf.yml \
  --name my-dashboard \
  --restart=always \
  lissy93/dashy:latest
