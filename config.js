import dotenv from 'dotenv';
dotenv.config();

const LOG_LEVEL = 4;
const PORT = 3069;
const SEND_WEBHOOKS = false;
const WEBHOOK_IMAGE = `https://avatars.githubusercontent.com/u/9919?s=280&v=4`;
const WEBHOOK_USERNAME = 'Github';

const {
    DISCORD_WEBHOOK,
    GIT_DEV_DIR,
    GIT_MAIN_DIR,
} = process.env;

const BRANCH_MAP = {
    development: 'development',
    main: 'main',
};

export {
    LOG_LEVEL,
    PORT,
    SEND_WEBHOOKS,
    WEBHOOK_IMAGE,
    WEBHOOK_USERNAME,

    BRANCH_MAP,

    DISCORD_WEBHOOK,

    GIT_DEV_DIR,
    GIT_MAIN_DIR,
};
