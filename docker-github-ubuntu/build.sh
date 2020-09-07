#!/usr/bin/env bash

cd docker-github-ubuntu
  docker build -t logickee/github_ubuntu -f dockerfile .
cd ..

# docker push logickee/github_ubuntu