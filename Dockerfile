FROM nginx:1.13.6

ADD /dist /usr/share/nginx/html
ADD /config.js /usr/share/nginx/html

