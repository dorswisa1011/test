import tornado.web

from abc import ABCMeta
from http import HTTPStatus
from typing import Dict


class Main(tornado.web.RequestHandler, metaclass=ABCMeta):
    http_status = HTTPStatus
    parameters: Dict

    @classmethod
    def initialize(cls, **kwargs):
        pass

    async def prepare(self):
        self.parameters = {
            "owner": self.get_argument("owner"),
            "repo": self.get_argument("repo"),
        }

    def write_error(self, *args, **kwargs):
        self.set_status(args[0])
        self.finish(chunk=str(kwargs["exc_info"][1]))

    def log_exception(self, typ, value, tb):
        pass


__all__ = ["Main"]
