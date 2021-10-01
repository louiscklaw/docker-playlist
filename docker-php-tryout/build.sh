#!/usr/bin/env bash

set -ex

# docker build -t logickee/ubuntu-php -f dockerfile.php . &
docker build -t logickee/ubuntu-laravel -f dockerfile.laravel . &
wait

# docker push logickee/ubuntu-php &
docker push logickee/ubuntu-laravel &

wait
