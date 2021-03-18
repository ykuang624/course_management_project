from requestManager import RequestManager


class RoomRequestManager(RequestManager):
    def __init__(self, db, table="rooms"):
        RequestManager.__init__(self, db, table)