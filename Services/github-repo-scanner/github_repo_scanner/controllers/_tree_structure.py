from abc import ABCMeta
from github_repo_scanner.controllers import Main
from github_repo_scanner.services import get_repo_tree


class TreeStructure(Main, metaclass=ABCMeta):
    pattern = r"/repo/tree/structure"

    async def get(self):
        response = get_repo_tree(
            owner=self.parameters.get("owner"),
            repo=self.parameters.get("repo"),
        )

        self.set_status(self.http_status.OK)
        await self.finish(chunk=response)
        return


__all__ = ["TreeStructure"]
