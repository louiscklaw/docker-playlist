#!/usr/bin/env bash

cd docker-github-node-tryout
  docker build -t logickee/github_node -f dockerfile .
cd ..


# docker push logickee/github_node &

wait
