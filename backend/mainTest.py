from courseTest import CourseTest
from sectionTest import SectionTest
from studentsTest import StudentsTest
from instructorTest import InstructorTest
from buildingTest import BuildingTest
from time_test import TimeTest
from repository.dbMysql import Database as sqlDatabase
from repository import Repository
from repository.dbMysql_test import DataBaseTest

if __name__ == "__main__":
    new_db = sqlDatabase()
    DataBaseTest.testCreate(new_db)
    DataBaseTest.testWhereQuery(new_db)
    # COURSE TEST
    # Before you begin testing don't forget to clean all philosophy classes from MySQL database "delete from courses where dept='Philosophy';"
    course_test = CourseTest(Repository(sqlDatabase()))
    course_test.addTest()
    course_test.deleteTest()
    course_test.readTest()
    course_test.modifyTest()

    # SECTION TEST
    # Before you begin testing don't forget to
    section_test = SectionTest(Repository(sqlDatabase()))
    section_test.addTest()
    section_test.readTest()
    section_test.modifyTest()
    section_test.deleteTest()

    # Student Test
    student_test = StudentsTest(Repository(sqlDatabase()))
    student_test.addTest()
    student_test.readTest()
    student_test.modifyTest()
    student_test.deleteTest()

    # Instructor Test
    instructor_test = InstructorTest(Repository(sqlDatabase()))
    instructor_test.addTest()
    instructor_test.readTest()
    instructor_test.modifyTest()
    instructor_test.deleteTest()


    # Time Test
    time_test = TimeTest(Repository(sqlDatabase()))
    time_test.addTest()
    time_test.readTest()
    time_test.deleteTest()

    # Building Test 
    building_test = BuildingTest(Repository(sqlDatabase()))
    building_test.addTest()
    building_test.readTest()
    building_test.deleteTest()