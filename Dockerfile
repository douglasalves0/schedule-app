FROM node:lts-buster

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api/

WORKDIR /home/node/api

COPY package.json ./

# USER node 

RUN npm install

COPY --chown=node:node . . 

RUN chmod +x docker-scripts/entrypoint.sh

RUN npm run build 

RUN npm prune --production

EXPOSE 3333

CMD ["node", "dist/main.js"]

