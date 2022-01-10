#!/usr/bin/env bash

set -ex



docker-compose -f docker-compose.yml build tests_host

docker-compose -f docker-compose.yml build react_host_client
docker-compose -f docker-compose.yml build react_host_cms
docker-compose -f docker-compose.yml build react_host_admin

docker-compose -f docker-compose.yml up -d react_host_client 
docker-compose -f docker-compose.yml up -d react_host_cms 
docker-compose -f docker-compose.yml up -d react_host_admin 

docker-compose -f docker-compose.yml run tests_host



# docker-compose -f docker-compose.yml run react_host
# docker-compose -f docker-compose.yml exec -it tests_host hostname
# docker-compose -f docker-compose.yml exec -it react_host /bin/bash
# docker-compose build
# docker-compose kill
# docker-compose down
# docker-compose up -d
# docker exec -it puppeteer-react_react_host_1 /bin/bash

