FROM node:10.24 AS build # You can correct the version according to the one you use
ARG app_version=0.1.0
RUN apt-get update \
    && apt-get install --yes --no-install-recommends make build-essential
WORKDIR /home/node
COPY ./ .
RUN npm ci && npm run build

FROM nginx:1.17.10-alpine
COPY --from=build /home/node/build/out /usr/share/nginx/html
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN sed -i 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
RUN sed -i 's/^user/#user/' /etc/nginx/nginx.conf
