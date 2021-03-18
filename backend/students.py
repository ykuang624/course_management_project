from requestManager import RequestManager


class StudentsRequestManager(RequestManager):
    def __init__(self, db, table="students"):
        RequestManager.__init__(self, db, table)
    
    def modify(self, new_data, student_id):
        '''
        Input:
            new_data(dict)
            student_id(int): the id of the section to be changed
        '''
        criteria = {"student_id":student_id}
        success = self.db.update(new_data=new_data, criteria=criteria, table=self.table)
        return success