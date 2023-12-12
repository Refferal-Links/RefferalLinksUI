
# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html

COPY . .
RUN cd dist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]