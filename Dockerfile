FROM node:10

# App directory
WORKDIR /Users/gabrielbodeen/Documents/hr/Mike-Pledge

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "node" ]


