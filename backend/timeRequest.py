from requestManager import RequestManager


class TimeRequestManager(RequestManager):
    def __init__(self, db, table="time_tb"):
        RequestManager.__init__(self, db, table)