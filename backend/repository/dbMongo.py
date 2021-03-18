from pymongo import MongoClient
import pprint


class MongoDatabase:

    def __init__(self):
        self._client = MongoClient()
        self._db = self._client.login
        self._collection = self._db.login

    def find(self, person_id: int, password: str):
        result = self._collection.find_one({"person_id": person_id, "password": password})
        if result:
            return True
        else: 
            return False


if __name__ == "__main__":
    new_db = MongoDatabase()
    new_db.find(1234567, "A1234567")
