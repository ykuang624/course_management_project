from course import CourseRequestManager


class CourseTest:
    '''
    This test is dependent on the success of dbMysqlTest
    '''
    def __init__(self, db):
        self.manager = CourseRequestManager(db)
   
    
    def addTest(self):
        data = {"code":998, "course_name":"How to live", "dept":"Philosophy","descript":"As important as how to die"}
        course_success = self.manager.add(data=data)
        expected = True
        if course_success == expected:
            print("add course test passed")
            return True
        else:
            print("add course test failed")  
            return False

    
    def deleteTest(self):
        data = {"code":998, "course_name":"How to live", "dept":"Philosophy","descript":"As important as how to die"}
        delete_success = self.manager.delete(data=data)
        expected = True
        if delete_success == expected:
            print("delete course test passed")
            return True
        else:
            print("delete course test failed, you might need to manually delete the Philosophy class")  
            return False
    
    def readTest(self):
        criteria = {"code":998, "course_name":"How to live", "dept":"Philosophy","descript":"As important as how to die"}
        course_success = self.manager.add(data=criteria)
        results, field_names = self.manager.read(criteria=criteria)
        if field_names == ['course_id', 'course_name', 'code', 'descript', 'dept'] and results[0][1:]== ('How to live', 998, 'As important as how to die', 'Philosophy'):
            print("course read test passed")
            return True
        else:
            print("course read test failed")
            return False
        self.manager.delete(data=criteria)

    def modifyTest(self):
        criteria = {"code":998, "course_name":"How to live", "dept":"Philosophy","descript":"As important as how to die"}
        results, field_names = self.manager.read(criteria=criteria)
        course_id = results[0][0]
        new_data = {"code":991}
        update_success = self.manager.modify(new_data=new_data, course_id = course_id)
        expected=True
        if update_success == expected:
            print("update course test passed")
            self.manager.delete({"code":991, "course_name":"How to live", "dept":"Philosophy","descript":"As important as how to die"})
            return True
        else:
            print("update course test failed, you might need to manually delete the Philosophy class")  
            return False