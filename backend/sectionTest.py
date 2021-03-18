from section import SectionRequestManager
from course import CourseRequestManager

class SectionTest:
    '''
    This test is dependent on the success of dbMysqlTest
    '''
    def __init__(self, db):
        self.db = db
        self.manager = SectionRequestManager(self.db)
   
    
    def addTest(self):
        course_manager = CourseRequestManager(self.db)
        course_data, field_names = course_manager.read({"dept":"Computer Science","code":100})
        course_id=course_data[0][0]

        data = {"course_id":course_id, "instructor_id":12,"room_id":7,"day_id":2, "time_id":2, "year":2020,"quarter":"Summer", "max_enrollment":23,"open_for_registration":1}
        section_success = self.manager.add(data=data)
        expected = True
        if section_success == expected:
            print("add section test passed")
            return True
        else:
            print("add section test failed")  
            return False

    def readTest(self):
        criteria = {"sections.instructor_id":12,"sections.room_id":7,"sections.day_id":2, "sections.time_id":2, "year":2020,"quarter":"Summer", "max_enrollment":23,"open_for_registration":1}
        results, field_names = self.manager.read(criteria=criteria)
        if field_names == ['course_id', 'course_name', 'code', 'descript', 'dept', 'section_id', 'course_id', 'instructor_id', 'ta_id', 'grader_id', 'room_id', 'day_id', 'time_id', 'year', 'quarter', 'max_enrollment', 'open_for_registration', 'instructor_id', 'instructor_fname', 'instructor_lname', 'room_id', 'room_name', 'building_id', 'capacity', 'whiteboard', 'building_id', 'building_name']:
            print("section read test passed")
            print(results)
            return True
        else:
            print("section read test failed")
            return False

    def deleteTest(self):
        # course_manager = CourseRequestManager(self.db)
        # course_data, field_names = course_manager.read({"dept":"Computer Science","code":100})
        # course_id=course_data[0][0]

        data = { "max_enrollment":23,"open_for_registration":1}
        # self.manager.add(data=data)
        delete_success = self.manager.delete(data=data)
        if delete_success == True:
            print("delete section test passed")
            return True
        else:
            print("delete section test failed")  
            return False
    


    def modifyTest(self):
        criteria = {"sections.instructor_id":12,"sections.room_id":7,"sections.day_id":2, "sections.time_id":2, "year":2020,"quarter":"Summer", "max_enrollment":23,"open_for_registration":1}
        results, field_names = self.manager.read(criteria=criteria)
        # print(field_names)
        section_id = results[0][5]
        new_data = {"room_id":5}
        update_success = self.manager.modify(new_data=new_data, section_id = section_id)
        expected=True
        if update_success == expected:
            print("update section test passed")
            return True
        else:
            print("update section test failed")  
            return False