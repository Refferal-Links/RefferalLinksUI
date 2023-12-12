
# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html

COPY . .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]