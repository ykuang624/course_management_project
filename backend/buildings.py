from requestManager import RequestManager


class BuildingRequestManager(RequestManager):
    def __init__(self, db, table="buildings"):
        RequestManager.__init__(self, db, table)