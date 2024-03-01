import axios from 'axios';
import { branchFromRef, getCommitId } from './git.js';

async function sendPulledWebhook(data) {
    try {
        if (process.env.SEND_WEBHOOKS !== 'true') return console.log('Webhooks are disabled');
        const { ref, commits, sender, repository, compare } = data;
        const commitLength = commits.length;

        let description = `**[[${repository.name}] ${commitLength} new commit${commitLength > 1 ? 's' : ''
            } pulled to \`${branchFromRef(ref)}\`](${compare})**\n\n`;
        commits.forEach((commit) => description += 
            `[\`${getCommitId(commit)}\`](${commit.url}) ${commit.message.substr(0, commit.message.indexOf('\n'))} - ${commit.author.name}\n`);

        const params = {
            username: 'Github Gilroy',
            avatar_url: `https://avatars.githubusercontent.com/u/9919?s=280&v=4`,
            embeds: [
                {
                    author: { name: sender.login, icon_url: sender.avatar_url },
                    color: 15258703,
                    description,
                },
            ],
        };
        // return await axios.post(process.env.DISCORD_WEBHOOK, params);
    } catch(e) {
        console.error('Error sending webhook', e);
    }
}

export { sendPulledWebhook };
