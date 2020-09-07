#!/usr/bin/env bash

set -ex

cd pipenv_test

  sudo apt update
  sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
  python3 -V
  python3 -m pip install pipenv
  PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"
  PATH="$PATH:$PYTHON_BIN_PATH"

  export LC_ALL=C.UTF-8
  export LANG=C.UTF-8

  pipenv --help

  pipenv sync
  pipenv run python3 ./helloworld.py

cd ..
