ARG PGADMIN4_VERSION=5.7
FROM dpage/pgadmin4:${PGADMIN4_VERSION}

MAINTAINER "Laradock Team <mahmoud@zalt.me>"

ENV PGADMIN_DEFAULT_EMAIL="laradock@laradock.io" \
    PGADMIN_DEFAULT_PASSWORD="password"

USER root
RUN mkdir -p /sessions

EXPOSE 80

VOLUME ["/sessions"]
