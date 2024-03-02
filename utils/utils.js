import { LOG_LEVEL, WEBHOOK_SECRET } from '../config.js';
import crypto from 'crypto';

function log(level, ...args) {
    if (level <= LOG_LEVEL) {
        if (level === 4) {
            return console.log('[DEBUG]', ...args); 
        }
        console.log(...args);
    }
}

const verifySignature = async (req) => {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
  let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
  let untrusted =  Buffer.from(req.headers["x-hub-signature-256"], 'ascii');
  return crypto.timingSafeEqual(trusted, untrusted);
};

async function verify(req, res) {
    const verify = await verifySignature(req);
    if (!verify) {
        res.status(401);
    }
    return verify;
};

const err = error => error?.message || error;

export { log, err, verifySignature, verify };
