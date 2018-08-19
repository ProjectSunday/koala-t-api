FROM node

COPY . /api/

WORKDIR /api/

CMD [ "npm", "run", "deploy"]
