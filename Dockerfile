FROM node:0.11.14

ADD app /app
WORKDIR /app

RUN npm install
RUN npm install -g webpack jsx-loader

RUN webpack

EXPOSE 3000

CMD ["node", "--harmony", "main.js"]
