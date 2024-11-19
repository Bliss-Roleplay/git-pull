import dotenv from 'dotenv';
dotenv.config();

const LOG_LEVEL = 3;
const PORT = 3069;
const SEND_WEBHOOKS = true;
const WEBHOOK_IMAGE = `https://avatars.githubusercontent.com/u/9919?s=280&v=4`;
const WEBHOOK_USERNAME = 'Github Gilroy';
const LOCATION = 'UNDEF-LOCAL';

const {
    WEBHOOK_SECRET,
    DISCORD_WEBHOOK,
    GIT_DEV_DIR,
    GIT_MAIN_DIR,
    GIT_VEH_DEV_DIR,
    GIT_VEH_MAIN_DIR,
    GIT_MAPS_DEV_DIR,
    GIT_MAPS_MAIN_DIR,
    GIT_CLOTH_DEV_DIR,
    GIT_CLOTH_MAIN_DIR,
    GIT_PANEL_DIR,
    GIT_BOT_DIR,
} = process.env;

export {
    WEBHOOK_SECRET,
    LOG_LEVEL,
    PORT,
    SEND_WEBHOOKS,
    WEBHOOK_IMAGE,
    DISCORD_WEBHOOK,
    WEBHOOK_USERNAME,
    LOCATION,

    GIT_DEV_DIR,
    GIT_MAIN_DIR,

    GIT_VEH_DEV_DIR,
    GIT_VEH_MAIN_DIR,
    GIT_MAPS_DEV_DIR,
    GIT_MAPS_MAIN_DIR,
    GIT_CLOTH_DEV_DIR,
    GIT_CLOTH_MAIN_DIR,

    GIT_PANEL_DIR,
    GIT_BOT_DIR,
};
