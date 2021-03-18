
from requestManager import RequestManager


class StudentSectionRequestManager(RequestManager):

    def __init__(self, db, table="student_section"):
        RequestManager.__init__(self, db, table)
 