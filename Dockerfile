FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/ 

ENV VERCEL=1

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
