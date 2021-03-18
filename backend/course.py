
from requestManager import RequestManager


class CourseRequestManager(RequestManager):
    def __init__(self, db, table="courses"):
        RequestManager.__init__(self, db, table)

    def modify(self, new_data, course_id):
        '''
        Input:
            new_data(dict)
            course_id(int): the id of the course to be changed
        '''
        criteria = {"courses.course_id": course_id}
        success = self.db.update(new_data=new_data, criteria=criteria, table=self.table)
        return success

