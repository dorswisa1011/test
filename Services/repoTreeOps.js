const octokitReq = require('./octokitReq');

/**
 * returns a string with the default branch name of a given repo of a given owner
 * @param {String} owner - the owner name of the repo
 * @param {String} repo - the repo name
 */
async function getDefaultBranchName (owner, repo) {
    let repoInfo
    let apiEndpoint = '/repos/{owner}/{repo}';
    let params = {owner:owner, repo:repo};

    repoInfo = await octokitReq.OctokitGetReq(apiEndpoint,params);

    return repoInfo.default_branch;
}

/**
 * returns a JSON with non-recursive tree (= not including subtrees) of a repo
 * @param {String} owner - the owner name of the repo
 * @param {String} repo - the repo name
 * @param {String} sha - Id of an item, that was given to it by Git
 */
async function getFileTree (owner, repo, sha) {
    let tree
    let apiEndpoint = '/repos/{owner}/{repo}/git/trees/{sha}';
    let params = {owner: owner, repo: repo, sha: sha};

    tree = await octokitReq.OctokitGetReq(apiEndpoint,params);

    return tree;
}

/**
 * returns a JSON with a recursive tree (= including subtrees) of a repo
 * @param {String} owner - the owner name of the repo
 * @param {String} repo - the repo name
 * @param {JSON} rootFileTree - non-recursive file tree of repo
 */
async function getFullFileTree (owner, repo, rootFileTree) {
    let tree = rootFileTree.tree;
    let internalTrees = await getAllInternalTrees(owner,repo,tree);

    for(let key in tree){
        rootFileTree.tree[key].tree = await internalTrees[key]
    }

    return rootFileTree;
}

/**
 * returns a JSON of repo trees
 * @param {String} owner - the owner name of the repo
 * @param {String} repo - the repo name
 * @param {JSON} tree - non-recursive file-tree of repo
 */
async function getAllInternalTrees (owner, repo, tree) {
    let internalTrees = {};

    for(let i in tree){
        if(tree[i].type == "tree") { //for each subtree found in repo
            console.log("scanning dir " + tree[i].path);
            let internalTreeSha = tree[i].sha;

            let treePromise = getTreePromise(owner,repo,internalTreeSha); //ask for the subtree, and continue without waiting
            internalTrees[i] = treePromise; //save the promised tree in a queue, by it's key
        }
    }

    return internalTrees;
}

/**
 * returns a JSON with a recursive tree (= including subtrees) of a repo
 * @param {String} owner - the owner name of the repo
 * @param {String} repo - the repo name
 * @param {String} sha - Id of an item, that was given to it by Git
 */
async function getTreePromise (owner, repo, sha) {
    let tree, internalTree;

    tree = await getFileTree(owner,repo,sha);
    internalTree = await getFullFileTree(owner,repo,tree); //when tree promise is resolved, build it's internal file tree

    return internalTree;
}

module.exports = { getFileTree, getFullFileTree, getDefaultBranchName};