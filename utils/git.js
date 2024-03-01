import { simpleGit } from 'simple-git';
import { log } from './utils.js';
import { GIT_DEV_DIR, GIT_MAIN_DIR } from '../config.js';

const options = {
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const repos = {
    development: simpleGit({ ...options, baseDir: GIT_DEV_DIR }),
    main: simpleGit({ ...options, baseDir: GIT_MAIN_DIR }),
};

const pull = async (branch) => {
    const data = {
        success: false,
        checkout: null,
        pull: null,
    };
    try {
        if (!branch || !repos[branch]) { throw new Error(`Invalid branch: '${branch}'`); }
        const git = repos[branch];
        data.checkout = await git.checkout(branch);
        data.pull = await git.pull();
        data.success = true;
    } catch (error) {
        log(2, 'Error pulling from git', error);
    }
    return data;
};

const branchFromRef = (ref) => ref.substr(ref.lastIndexOf('/') + 1, ref.length);
const getCommitId = (commit) => commit.id.substr(0, 7);
const sanitizeCommitMsg = (msg) => msg.substr(0, msg.replace(/\n+/g, ' '));
const shortCommitMsg = (msg) => msg.substr(0, msg.indexOf('\n'));

export { 
    repos, 
    
    pull, 
    
    branchFromRef, 
    getCommitId, 
    sanitizeCommitMsg, 
    shortCommitMsg,
};
