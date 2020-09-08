#!/usr/bin/env bash

cd docker-github-python-tryout
  docker build -t logickee/github_python -f dockerfile .
cd ..

# docker push logickee/github_ubuntu