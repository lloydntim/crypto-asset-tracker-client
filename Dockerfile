FROM node:14 AS build

WORKDIR /app

COPY package*.json /app

RUN rm -rf node_modules/ && npm i --production

COPY . /app

CMD [ "npm", "run", "build" ]

EXPOSE $PORT

FROM nginx:alpine
# COPY ./nginx.conf /etc/nginx/nginx.template

# Lets use default port 80 for testing
ENV PORT=80

COPY --from=build /app/dist /usr/share/nginx/html

# Copy our configuration file to a folder in our Docker image where Nginx will use it
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Replace $PORT with $PORT value and run nginx.
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

# Configure Nginx for Heroku
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'