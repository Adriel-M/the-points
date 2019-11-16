FROM mhart/alpine-node

WORKDIR /app

COPY . .

RUN npm ci && npm run build

CMD ["npm", "start"]
