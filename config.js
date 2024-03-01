import dotenv from 'dotenv';
dotenv.config();

const LOG_LEVEL = 4;
const PORT = 3096;
const SEND_WEBHOOKS = true;

const {
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

const BRANCH_MAP = {
    development: 'development',
    // main: 'main',
    // 'bcrp-vehicles': 'bcrp-vehicles',
    // 'bcrp-maps': 'bcrp-maps',
    // 'bcrp-clothing': 'bcrp-clothing',
    // 'bcrp-panel': 'bcrp-panel',
    // 'bcrp-bot': 'bcrp-bot',
};

export {
    LOG_LEVEL,
    PORT,
    SEND_WEBHOOKS,

    BRANCH_MAP,

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
}