import { sendPulledWebhook, sendErrorWebhook } from './discord.js';
import { pull, branchFromRef } from './git.js';
import { log } from './utils.js';

async function pushEvent({ ref, repository, ...rest }) {
    log(5, ref, repository);
    const branch = branchFromRef(ref);
    const pullLog = await pull(repository.name, branch);
    if (pullLog.success) {
        log(2, `Successfully pulled branch '${branch}'!`);
        sendPulledWebhook({ ref, repository, ...rest }, 'push');
    } else {
        sendErrorWebhook(new Error(`There was an error pulling from git!\n\n${error.message ? error.message : error}`));
        log(2, 'There was an error pulling from git!');
    }
    log(4, 'Received a push event');
}

async function pingEvent(data) {
    log(1, data);
    log(1, 'Received a ping event');
}

function openedEvent(data) {
    log(3, 'Received a opened event');
}

function closedEvent(data) {
    log(3, 'Received a closed event');
}

function unhandledEvent(data) {
    log(3, 'Received an unhandled event');
}

export {
    pushEvent,
    pingEvent,
    openedEvent,
    closedEvent,
    unhandledEvent,
};
