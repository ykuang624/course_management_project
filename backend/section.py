
from course import CourseRequestManager
from requestManager import RequestManager

class SectionRequestManager(RequestManager):

    def __init__(self, db, table="sections"):
        RequestManager.__init__(self, db, table)
        # self.db = db
        # self.table = "sections"

    # def add(self, data):
    #     '''
    #     Input:
    #         data(dictionary)
    #     '''
    #     success = False

    #     if "room_id" in data.keys():
    #         success = self.db.create(data=data, table=self.table)
    #     # else:
    #     #     room_ids = self.find_room(data["max_enrollment"], data[""])
    #     #     if room_ids:
    #     #         for room_id in room_ids:
    #     #             try:
    #     #                 data["room_id"] = room_id
    #     #                 success = self.db.create(data=data, table=self.table)
    #     #                 if success:
    #     #                     message = "Section successfully created"

    #     #                     break
    #     #             except Exception as e: 
    #     #                 print(e)
    #     #                 continue
    #         # else:
    #         #     message ="No rooms available"

    #     return success
                                
    # def find_room(self, max_enrollment, day_data, time_id):
    #     '''
    #     Input:
    #         capactiy(int): max enrollment number
    #     Output:
    #         room_id(int)
    #     '''
    #     # Select all rooms that satisfy the room requirement
    #     rooms = self.db.find(select=["room_id"], table="rooms", criteria={"capacity":{"operator":">=", "arg":max_enrollment}})
    #     room_ids = [room["room_id"] for room in rooms]
    #     return room_ids
        

    def modify(self, new_data, section_id):
        '''
        Input:
            new_data(dict)
            section_id(int): the id of the section to be changed
        '''

        criteria = {"section_id":section_id}
        success = self.db.update(new_data=new_data, criteria=criteria, table=self.table)
        return success

    # def delete(self, data):
    #     # I can only delete a section that has less than 5 students or no instructor
    #     success = False
    #     # Check on students number
    #     # student_results = self.db.find(select=["COUNT(student_id)"], from_tables={"tables":"student_section"}, criteria={"section_id":data["section_id"]},limit=["GROUPBY section_id HAVING COUNT(student_id) >= 5"])
    #     # if student_results:
    #     #     message = "Students over 5, cannot delete"
    #     # else: 
    #     #     #Check on instructor availability on sections 
    #     #     instructor_result =  self.db.find(select=["instructor_id"], from_table={"tables":self.table}, criteria={"section_id":data["section_id"]})
    #     #     # To do : also check instructor's availability for labs
    #     #     if not instructor_result[0]["instructor_id"]:
    #     #         # To do: find all labs realted with the section
    #     #         # To do: find all students related in student_section table
    #     #         # To do: delete all students_section relation
    #     #         # To do: delete all labs
    #     #         # to do: delete all sections 
    #     #         if self.db.delete(criteria = data, table = self.table):
    #     #             success =  True
    #     #             message = "deleted the section successfully"
    #     #             #DON"t forget to delete course if all sections are gone
    #     #             # section_results = self.db.find(select = ["sections.course_id"], from_table={"tables":self.table})
    #     #             # if not instructor_result[0]["sections.course_id"]:
    #     #             #     course_manager = CourseRequestManager(self.db)
    #     #             #     course_manager.delete(criteria={"sections.course_id":course_id})
    #     #     else:
    #     #         message="professor available, cannot delete"
    #     if self.db.delete(criteria = data, table = self.table):
    #         success = True
    #     return success

    def read(self, criteria):
        '''
        Inputs:
            criteria(dictionary)
        '''
        select= [" * "]
        tables = ["courses",self.table, "instructors", "rooms", "buildings"]
        ons = ["courses.course_id=sections.course_id", "sections.instructor_id = instructors.instructor_id", "sections.room_id=rooms.room_id", "rooms.building_id=buildings.building_id"]
        results, field_names = self.db.find(select=select, from_tables={"tables":tables, "ons":ons}, criteria=criteria, limit=None)
        return results, field_names
        
    