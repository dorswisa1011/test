import os

from github_repo_scanner.utils import http_get


def get_repo_sha(owner, repo):
    response = http_get(
        url=f"{os.getenv('GITHUB_HOST')}/repos/{owner}/{repo}/branches/master"
    )
    return response["commit"]["sha"]


def get_repo_tree(owner, repo):
    sha = get_repo_sha(owner=owner, repo=repo)
    return http_get(
        url=f"{os.getenv('GITHUB_HOST')}/repos/{owner}/{repo}/git/trees/{sha}"
    )


__all__ = ["get_repo_tree"]
