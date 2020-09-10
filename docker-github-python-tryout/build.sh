#!/usr/bin/env bash

cd docker-github-python-tryout
  docker build -t logickee/github_python -f dockerfile . &
cd ..

wait

docker push logickee/github_python &

wait
