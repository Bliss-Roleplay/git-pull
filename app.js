import express from 'express';
import { pingEvent, pushEvent } from './utils/events.js';
import { log } from './utils/utils.js';
import { PORT } from './config.js';

const app = express();

app.post('/webhook', express.json({ type: 'application/json' }), (req, res) => {
    res.status(202).send('Accepted');

    const githubEvent = req.headers['x-github-event'];
    const data = req.body;
    const action = data.action;
    log(3, 'Webhook received', githubEvent);
    
    if (githubEvent === 'ping') {
        pingEvent(data);
    } else if (githubEvent === 'push') {
        pushEvent(data);
    } else {
        log(2, `Unhandled event ${githubEvent}`);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
