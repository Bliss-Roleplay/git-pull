import axios from 'axios';
import { branchFromRef, getCommitId } from './git.js';
import { SEND_WEBHOOKS, WEBHOOK_IMAGE, WEBHOOK_USERNAME, DISCORD_WEBHOOK } from '../config.js';
import { log } from './utils.js';

async function sendPulledWebhook(data) {
    try {
        if (!SEND_WEBHOOKS) throw log(2, 'Webhooks are disabled');
        const { ref, commits, sender, repository, compare } = data;
        const commitLength = commits.length;

        let description = `**[[${repository.name}] ${commitLength} new commit${commitLength > 1 ? 's' : ''
            } pulled to \`${branchFromRef(ref)}\`](${compare})**\n\n`;
        commits.forEach((commit) => description += 
            `[\`${getCommitId(commit)}\`](${commit.url}) ${commit.message.substr(0, commit.message.indexOf('\n'))} - ${commit.author.name}\n`);

        const params = {
            username: WEBHOOK_USERNAME,
            avatar_url: WEBHOOK_IMAGE,
            embeds: [
                {
                    author: { name: sender.login, icon_url: sender.avatar_url },
                    color: 15258703,
                    description,
                },
            ],
        };
        return await axios.post(DISCORD_WEBHOOK, params);
    } catch(e) {
        log(2, 'Error sending webhook', e);
    }
}

export { sendPulledWebhook };
