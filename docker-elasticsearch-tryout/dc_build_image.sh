#!/usr/bin/env bash

set -ex

docker compose build

docker tag docker-elasticsearch-tryout-elasticsearch \
  192.168.10.61:5000/docker-elasticsearch-tryout-elasticsearch

docker push 192.168.10.61:5000/docker-elasticsearch-tryout-elasticsearch

docker tag docker-elasticsearch-tryout-kibana \
  192.168.10.61:5000/docker-elasticsearch-tryout-kibana

docker push 192.168.10.61:5000/docker-elasticsearch-tryout-kibana &

docker tag docker-elasticsearch-tryout-logstash \
  192.168.10.61:5000/docker-elasticsearch-tryout-logstash

docker push 192.168.10.61:5000/docker-elasticsearch-tryout-logstash &

wait

echo "done"
