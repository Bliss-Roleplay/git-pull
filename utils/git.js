import { simpleGit } from 'simple-git';
import { log, err } from './utils.js';
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
    'Bliss-RP': {
        // development: simpleGit({ ...options, baseDir: GIT_DEV_DIR }),
        main: simpleGit({ ...options, baseDir: GIT_MAIN_DIR }),
    },
    // 'bcrp-vehicles': {
    //     development: simpleGit({ ...options, baseDir: GIT_VEH_DEV_DIR }),
    //     // main: simpleGit({ ...options, baseDir: GIT_VEH_MAIN_DIR }),
    // },
    'Bliss-Maps': {
        // development: simpleGit({ ...options, baseDir: GIT_MAPS_DEV_DIR }),
        main: simpleGit({ ...options, baseDir: GIT_MAPS_MAIN_DIR }),
    },
    // 'bcrp-clothing': {
    //     // development: simpleGit({ ...options, baseDir: GIT_CLOTH_DEV_DIR }),
    //     // main: simpleGit({ ...options, baseDir: GIT_CLOTH_MAIN_DIR }),
    // },
    // 'bcrp-panel': {
    //     main: simpleGit({ ...options, baseDir: GIT_PANEL_DIR }),
    // },
    // 'bcrp-bot': {
    //     main: simpleGit({ ...options, baseDir: GIT_BOT_DIR }),
    // },
};

const pull = async (repo, branch) => {
    const data = {
        success: false,
        error: null,
        checkout: null,
        pull: null,
    };
    try {
        const git = getGit(repo, branch);
        const curBranch = await getCurrentBranch(repo, branch);
        if (!curBranch) throw new Error('Unable to get GIT branch.');
        if (curBranch !== branch) data.checkout = await git.checkout(branch);
        data.pull = await git.pull();
        data.success = true;
    } catch (error) {
        data.error = error;
        log(5, 'Error pulling from git:', err(error));
    }
    return data;
};

const getCurrentBranch = async (repo, branch) => {
    try {
        const git = getGit(repo, branch);
        const status = await git.status(['-s']);
        return status.current;
    } catch (error) {
        log(2, 'Error getting current branch:', err(error));
        throw error;
    }
};

const getGit = (repo, branch) => {
    try {
        if (!repos?.[repo]?.[branch]) { throw new Error(`Unable to get GIT branch. ${niceBranch(repo, branch)} has not yet been configured.`); }
        return repos[repo][branch];
    } catch (error) {
        log(5, 'Error getting git:', err(error));
        throw error;
    }
};

const niceBranch = (repo, branch) => `\`${repo}/${branch}\``;
const branchFromRef = ref => ref.substr(ref.lastIndexOf('/') + 1, ref.length);
const getCommitId = commit => commit.id.substr(0, 7);
const sanitizeCommitMsg = msg => msg.substr(0, msg.replace(/\n+/g, ' '));
const shortCommitMsg = msg => msg.substr(0, msg.indexOf('\n'));

export { 
    repos, 
    
    pull,
    getGit,
    getCurrentBranch,

    niceBranch,
    branchFromRef, 
    getCommitId, 
    sanitizeCommitMsg, 
    shortCommitMsg,
};
