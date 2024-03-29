FROM ubuntu:20.10

# Set default user and workdir
USER root
WORKDIR /

# Set DEBIAN_FRONTEND to noninteractive
ENV DEBIAN_FRONTEND noninteractive

RUN sed -i 's/http:\/\/archive\.ubuntu\.com/http:\/\/ftp\.cuhk\.edu\.hk\/pub\/Linux/g' /etc/apt/sources.list && \
  sed -i 's/http:\/\/security\.ubuntu\.com/http:\/\/ftp\.cuhk\.edu\.hk\/pub\/Linux/g' /etc/apt/sources.list

RUN apt-get update && \
  apt-get install -y zsh sudo

RUN apt install -y php libapache2-mod-php

CMD ["/bin/bash"]
