# # CREDIT: https://github.com/shren207/nextjs-docker-compose
# # Dockerfile
# FROM python:bullseye

# # Set DEBIAN_FRONTEND to noninteractive
# ENV DEBIAN_FRONTEND noninteractive

# WORKDIR /usr/src/app

# CMD [ "python", "-m", "http.server" ]

# VOLUME /usr/src/app/public

# EXPOSE 8080

FROM python:3

WORKDIR /usr/src/app/public

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

VOLUME /usr/src/app/public

CMD [ "python", "-m", "http.server" ]
