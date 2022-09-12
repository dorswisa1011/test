const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

/**
 * makes octokit GET requests only
 * @param {String} endpoint - the endpoint to approach, with {} in places to replace. ex : /repos/{owner}/{repo}
 * @param {JSON} params - JSON with the {params} to exchange in the endpoint. ex: {owner:xxx, repo:yyy}
 */
async function OctokitGetReq (endpoint, params){
    try {
        let response = await octokit.request('GET ' + endpoint, params);
        return response.data;
    } catch (err){
        console.error("[!] ERROR: Function OctokitGetReq return error");
        console.error(`ERROR: ${err}`);
    }
}

module.exports = { OctokitGetReq };