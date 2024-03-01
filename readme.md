# Git Pull

### A small express server handling pulling repos when webhooks are triggered cause I'm lazy.

## Installation

.env 
```env
DISCORD_WEBHOOK=<DISCORD_WEBHOOK>

GIT_DEV_DIR=C:\\path\\to\\repo
GIT_MAIN_DIR=C:\\another\\path
```
yarn install && npm install -g smee-client

`smee -u <SMEE_URL> --target http://127.0.0.1:3069/webhook`

yarn smee && yarn start

## Docs 
https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries
https://smee.io/