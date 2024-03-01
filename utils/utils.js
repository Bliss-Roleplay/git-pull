import { LOG_LEVEL } from '../config.js';

function log(level, ...args) {
    if (level <= LOG_LEVEL) {
        if (level === 4) {
            return console.log('[DEBUG]', ...args); 
        }
        console.log(...args);
    }
}

export { log };
