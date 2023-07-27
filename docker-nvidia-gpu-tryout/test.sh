#!/usr/bin/env bash

set -ex

sudo docker run --rm --gpus all --privileged -v /dev:/dev nvidia/cuda:12.2.0-devel-ubuntu20.04 nvidia-smi
