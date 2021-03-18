from students import StudentsRequestManager


class StudentsTest:

    def __init__(self, db):
        self.db = db
        self.manager = StudentsRequestManager(self.db)
   
    
    def addTest(self):
        data = {"student_fname":"Florida", "student_lname":"Paris"}
        add_success = self.manager.add(data=data)
        expected = True
        if add_success == expected:
            print("add student test passed")
            return True
        else:
            print("add student test failed")  
            return False

    def readTest(self):
        criteria = {"student_fname":"Florida", "student_lname":"Paris"}
        results, field_names = self.manager.read(criteria=criteria)
        if results != []:
            print("student read test passed")
            return True
        else:
            print("student read test failed")
            return False

    def deleteTest(self):

        data = {"student_fname":"Florida"}
        # self.manager.add(data=data)
        delete_success = self.manager.delete(data=data)
        if delete_success == True:
            print("delete student test passed")
            return True
        else:
            print("delete student test failed")  
            return False
    


    def modifyTest(self):
        criteria = {"student_fname":"Florida", "student_lname":"Paris"}
        results, field_names = self.manager.read(criteria=criteria)
        student_id = results[0][0]
        new_data = {"student_lname":"Green"}
        update_success = self.manager.modify(new_data=new_data, student_id = student_id)
        expected=True
        if update_success == expected:
            print("update student test passed")
            return True
        else:
            print("update student test failed")  
            return False