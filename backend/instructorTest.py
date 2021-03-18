from instructors import InstructorRequestManager

class InstructorTest:

    def __init__(self, db):
        self.db = db
        self.manager = InstructorRequestManager(self.db)
   
    
    def addTest(self):
        data = {"instructor_fname":"Professor", "instructor_lname":"KnowEverything"}
        add_success = self.manager.add(data=data)
        expected = True
        if add_success == expected:
            print("add instructor test passed")
            return True
        else:
            print("add instructor test failed")  
            return False

    def readTest(self):
        criteria = {"instructor_fname":"Professor", "instructor_lname":"KnowEverything"}
        results, field_names = self.manager.read(criteria=criteria)
        if results != []:
            print("instructor read test passed")
            return True
        else:
            print("instructor read test failed")
            return False

    def deleteTest(self):

        data = {"instructor_fname":"Professor"}
        # self.manager.add(data=data)
        delete_success = self.manager.delete(data=data)
        if delete_success == True:
            print("delete instructor test passed")
            return True
        else:
            print("delete instructor test failed")  
            return False
    


    def modifyTest(self):
        criteria = {"instructor_fname":"Professor", "instructor_lname":"KnowEverything"}
        results, field_names = self.manager.read(criteria=criteria)
        instructor_id = results[0][0]
        new_data = {"instructor_lname":"Green"}
        update_success = self.manager.modify(new_data=new_data, instructor_id = instructor_id)
        expected=True
        if update_success == expected:
            print("update instructor test passed")
            return True
        else:
            print("update instructor test failed")  
            return False