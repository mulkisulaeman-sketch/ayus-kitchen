FROM nginx:1.27-alpine

RUN sed -i 's|pid        /run/nginx.pid;|pid        /tmp/nginx.pid;|' /etc/nginx/nginx.conf \
    && rm -rf /usr/share/nginx/html/* \
    && mkdir -p /var/cache/nginx/client_temp \
               /var/cache/nginx/proxy_temp \
               /var/cache/nginx/fastcgi_temp \
               /var/cache/nginx/uwsgi_temp \
               /var/cache/nginx/scgi_temp \
    && chown -R nginx:nginx \
        /var/cache/nginx \
        /var/log/nginx \
        /etc/nginx \
        /usr/share/nginx/html

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

RUN printf '%s\n' \
  'server {' \
  '    listen 8080;' \
  '    server_name _;' \
  '    root /usr/share/nginx/html;' \
  '    index index.html;' \
  '' \
  '    location / {' \
  '        try_files $uri $uri/ /index.html;' \
  '    }' \
  '' \
  '    location = /health {' \
  '        access_log off;' \
  '        default_type application/json;' \
  '        return 200 '\''{"status":"ok","service":"ayus-kitchen-frontend"}'\'';' \
  '    }' \
  '}' \
  > /etc/nginx/conf.d/default.conf \
  && chown nginx:nginx /etc/nginx/conf.d/default.conf

EXPOSE 8080

USER nginx
