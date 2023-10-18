FROM public.ecr.aws/docker/library/node:18-alpine3.17  as builder

ENV NODE_ENV development
WORKDIR /usr

COPY ./app/package.json ./package.json
COPY ./app/yarn.lock ./yarn.lock
COPY ./app/tsconfig.json ./tsconfig.json
RUN yarn install

COPY ./app/src ./src
RUN yarn build-api

# Image application production
FROM public.ecr.aws/docker/library/node:18-alpine3.17  as app
RUN apk add --update curl dumb-init && \
    rm -rf /var/cache/apk/* &&\
    yarn global add clean-modules

ENV APP_HOME /application
ENV NODE_ENV production
RUN mkdir -m 777 $APP_HOME && \
    chown node:node $APP_HOME

WORKDIR $APP_HOME

COPY --chown=node:node --from=builder /usr/package.json /$APP_HOME/package.json
COPY --chown=node:node --from=builder /usr/yarn.lock /$APP_HOME/yarn.lock
RUN rm -rf node_modules
RUN yarn cache clean
RUN yarn install --production --silent

COPY --chown=node:node --from=builder /usr/.build $APP_HOME/.build

USER node

CMD ["dumb-init", "node", "--max-old-space-size=1536", "/application/.build/src/index.js"]
