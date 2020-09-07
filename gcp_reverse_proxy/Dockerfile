FROM nginx:mainline-alpine

RUN rm /etc/nginx/conf.d/*

ADD ./nginx/nginx_conf/hello.conf /etc/nginx/conf.d/
ADD ./nginx/nginx_conf/http_aboutme_louislabs_com.conf /etc/nginx/conf.d/

# ADD ./nginx/html/index.html /usr/share/nginx/html/
