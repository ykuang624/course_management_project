from timeRequest import TimeRequestManager

class TimeTest:

    def __init__(self, db):
        self.db = db
        self.manager = TimeRequestManager(self.db)
   
    
    def addTest(self):
        data = {"start_time":"23:00","end_time":"23:59"}
        add_success = self.manager.add(data=data)
        expected = True
        if add_success == expected:
            print("add time test passed")
            return True
        else:
            print("add time test failed")  
            return False

    def readTest(self):
        criteria = {"start_time":"23:00","end_time":"23:59"}
        results, field_names = self.manager.read(criteria=criteria)
        if results != []:
            print("time read test passed")
            return True
        else:
            print("time read test failed")
            return False

    def deleteTest(self):

        data = {"start_time":"23:00","end_time":"23:59"}
        # self.manager.add(data=data)
        delete_success = self.manager.delete(data=data)
        if delete_success == True:
            print("delete time test passed")
            return True
        else:
            print("delete time test failed")  
            return False
