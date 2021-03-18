from requestManager import RequestManager


class InstructorRequestManager(RequestManager):
    def __init__(self, db, table="instructors"):
        RequestManager.__init__(self, db, table)
    
    def modify(self, new_data, instructor_id):
        '''
        Input:
            new_data(dict)
            instructor_id(int): the id of the section to be changed
        '''
        criteria = {"instructor_id":instructor_id}
        success = self.db.update(new_data=new_data, criteria=criteria, table=self.table)
        return success