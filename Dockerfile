FROM node:22-alpine

WORKDIR /app

ENV PORT=3000

RUN apk add --no-cache git

RUN npm install -g serve

RUN npx create-landing-kit@latest .

COPY ./scripts/runtime-build.sh  ./scripts/

EXPOSE $PORT

CMD ["sh", "-c", "./scripts/runtime-build.sh && serve -s out -p $PORT"]