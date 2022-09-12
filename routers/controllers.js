const octokitReq = require('../Services/octokitReq');
const repoTreeOps = require('../Services/RepoTreeOps');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

async function getFullRepoTree (req, res) {
    try{
        const owner = req.owner, repo = req.repo;

        //get name of repo root branch
        let defaultBranch = await repoTreeOps.getDefaultBranchName(owner,repo);

        //get repo root tree
        let rootFileTree = await repoTreeOps.getFileTree(owner,repo,defaultBranch);

        //get repo full file tree
        let repoFileTree = await repoTreeOps.getFullFileTree(owner, repo, rootFileTree);

        console.log("finished creating tree");
        return repoFileTree;

    } catch(err) {
        console.error("[!] ERROR: Function getRepoTree return error");
        console.error(`ERROR: ${err}`);
    }
}

module.exports = {getFullRepoTree}