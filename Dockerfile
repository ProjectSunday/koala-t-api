FROM node

COPY . /api/

WORKDIR /api/

CMD [ "node", "index.js"]
