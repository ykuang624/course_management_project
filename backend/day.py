from requestManager import RequestManager


class DayRequestManager(RequestManager):
    def __init__(self, db, table="day_tb"):
        RequestManager.__init__(self, db, table)