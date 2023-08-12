FROM node:alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ARG RAILWAY_SERVICE_GRAPHQL_APOLLO_API_URL
ENV RAILWAY_SERVICE_GRAPHQL_APOLLO_API_URL=$RAILWAY_SERVICE_GRAPHQL_APOLLO_API_URL

COPY package*.json /app

RUN npm ci

COPY ./ /app

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]