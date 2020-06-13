import pytest

sample_user = pytest.fixture(lambda: {

})


def test_unregister_user(client, sample_user):
    assert False
