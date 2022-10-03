import requests

from bson import json_util


def http_get(**kwargs):
    response = requests.get(**kwargs)
    content = json_util.loads(response.content)
    if response.status_code != 200:
        raise Exception(content)
    return content


__all__ = ["http_get"]
