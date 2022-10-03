import os
import tornado.web

from github_repo_scanner.controllers import TreeStructure
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.web import url


class Service(tornado.web.Application):
    def __init__(self):
        handlers = [
            url(pattern=TreeStructure.pattern, handler=TreeStructure, kwargs={}),
        ]
        tornado.web.Application.__init__(
            self, handlers=handlers, debug=False, autoreload=False
        )


__all__ = ["Service"]


def main():
    app = Service()
    _tornado = HTTPServer(app)
    _tornado.bind(port=int(os.getenv("PORT")), address="0.0.0.0")
    _tornado.start(num_processes=1)
    IOLoop.current().start()


if __name__ == "__main__":
    main()
