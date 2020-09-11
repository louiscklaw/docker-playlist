#!/usr/bin/env bash

cd docker-github-ubuntu-tryout
  docker build -t logickee/github_ubuntu -f dockerfile .
cd ..


docker push logickee/github_ubuntu &

wait
