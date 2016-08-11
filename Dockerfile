FROM nginx
MAINTAINER Octoblu <docker@octoblu.com>

COPY package.json .

RUN cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]' > .PKG_VERSION

COPY index.html . 
COPY templates/ templates/

RUN sed -e \
  "s%=\"/assets%=\"https://connector-factory-static.octoblu.com/v$(cat .PKG_VERSION)%" \
  /index.html > \
  /usr/share/nginx/html/index.html
  
RUN sed -e \
  "s/PKG_VERSION/$(cat .PKG_VERSION)/" \
  /templates/default.template > \
  /etc/nginx/conf.d/default.conf

RUN cp /templates/gzip.conf /etc/nginx/conf.d/gzip.conf
