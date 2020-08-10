from starlette.testclient import TestClient


class BaseTestCase:
    __test__ = False

    client: TestClient
    user_data: dict

    def __init__(self, client: TestClient, user_data: dict):
        self.client = client
        self.user_data = user_data
