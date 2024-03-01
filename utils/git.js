import { simpleGit } from 'simple-git';
import { log } from './utils.js';
import { 
    GIT_DEV_DIR, GIT_MAIN_DIR, GIT_VEH_DEV_DIR,
    GIT_VEH_MAIN_DIR, GIT_MAPS_DEV_DIR, GIT_MAPS_MAIN_DIR,
    GIT_CLOTH_DEV_DIR, GIT_CLOTH_MAIN_DIR, GIT_PANEL_DIR, GIT_BOT_DIR } from '../config.js';

const options = {
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const repos = {
    'bcrp-main': {
        development: simpleGit({ ...options, baseDir: GIT_DEV_DIR }),
        // main: simpleGit({ ...options, baseDir: GIT_MAIN_DIR }),
    },
    'bcrp-vehicles': {
        development: simpleGit({ ...options, baseDir: GIT_VEH_DEV_DIR }),
        // main: simpleGit({ ...options, baseDir: GIT_VEH_MAIN_DIR }),
    },
    'bcrp-maps': {
        development: simpleGit({ ...options, baseDir: GIT_MAPS_DEV_DIR }),
        // main: simpleGit({ ...options, baseDir: GIT_MAPS_MAIN_DIR }),
    },
    'bcrp-clothing': {
        development: simpleGit({ ...options, baseDir: GIT_CLOTH_DEV_DIR }),
        // main: simpleGit({ ...options, baseDir: GIT_CLOTH_MAIN_DIR }),
    },
    'bcrp-panel': {
        main: simpleGit({ ...options, baseDir: GIT_PANEL_DIR }),
    },
    'bcrp-bot': {
        main: simpleGit({ ...options, baseDir: GIT_BOT_DIR }),
    },
};

const pull = async (repo, branch) => {
    const data = {
        success: false,
        checkout: null,
        pull: null,
    };
    try {
        const git = getGit(repo, branch);
        if (await getCurrentBranch(repo, branch) !== branch) data.checkout = await git.checkout(branch);
        data.pull = await git.pull();
        data.success = true;
    } catch (error) {
        log(2, 'Error pulling from git', error);
    }
    return data;
};

const getCurrentBranch = async (repo, branch) => {
    try {
        const git = getGit(repo, branch);
        const status = await git.status(['-s']);
        log(3, 'Current branch:', status.current);
        return status.current;
    } catch (error) {
        log(2, 'Error getting current branch', error);
    }
};

const getGit = (repo, branch) => {
    try {
        if (!repos?.[repo]?.[branch]) { throw new Error(`Invalid branch/repo: '${repo}/${branch}'`); }
        return repos[repo][branch];
    } catch (error) {
        log(2, 'Error getting git', error);
    }
};

const branchFromRef = (ref) => ref.substr(ref.lastIndexOf('/') + 1, ref.length);
const getCommitId = (commit) => commit.id.substr(0, 7);
const sanitizeCommitMsg = (msg) => msg.substr(0, msg.replace(/\n+/g, ' '));
const shortCommitMsg = (msg) => msg.substr(0, msg.indexOf('\n'));

export { 
    repos, 
    
    pull,
    getGit,
    getCurrentBranch,

    branchFromRef, 
    getCommitId, 
    sanitizeCommitMsg, 
    shortCommitMsg,
};
