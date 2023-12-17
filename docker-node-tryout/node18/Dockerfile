FROM ubuntu:18.04

# Set DEBIAN_FRONTEND to noninteractive
ENV DEBIAN_FRONTEND noninteractive

# Set default user and workdir
USER root
WORKDIR /

# Download and import the Nodesource GPG key
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Create deb repository
ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Run Update and Install
RUN apt-get update
RUN apt-get install nodejs -y

RUN useradd --uid 1000 --shell /bin/bash --user-group user

RUN mkdir -p /home/user && chown -R 1000:1000 /home/user
RUN mkdir -p /.npm && chown -R 1000:1000 /.npm

USER 1000
WORKDIR /src

CMD ["/bin/bash"]
