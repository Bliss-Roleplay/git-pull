import { sendPulledWebhook, sendErrorWebhook } from './discord.js';
import { pull, branchFromRef, niceBranch } from './git.js';
import { log, err } from './utils.js';

async function pushEvent({ ref, repository, ...rest }) {
    log(4, 'Received a push event', ref);
    log(5, repository);
    const branch = branchFromRef(ref);
    try {
        const pullLog = await pull(repository.name, branch);
        if (pullLog.success) {
            log(2, `Successfully pulled branch '${branch}'!`);
            sendPulledWebhook({ ref, repository, ...rest }, 'push');
        } else {
            const { error } = pullLog;
            throw error;
        }
    } catch(error) {
        log(2, 'There was an error pulling from git:', err(error));
        sendErrorWebhook(new Error(`There was an error pulling repo!\n\n${err(error)}`));
    }
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
