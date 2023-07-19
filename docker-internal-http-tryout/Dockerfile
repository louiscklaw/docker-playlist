# CREDIT: https://github.com/shren207/nextjs-docker-compose
# Dockerfile
FROM node:18-buster

RUN mkdir /app
RUN chown 1000:1000 -R /app
WORKDIR /app

VOLUME /app/node_modules

USER 1000:1000
