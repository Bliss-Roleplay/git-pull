import { config } from 'dotenv';
config();

function log(level, ...args) {
    console.log('log event', level, +process.env.LOG_LEVEL, level <= +process.env.LOG_LEVEL);
    if (level <= +process.env.LOG_LEVEL) {
        if (level === 4) {
            return console.log('[DEBUG]', ...args); 
        }
        console.log(...args);
    }
}

export { log };