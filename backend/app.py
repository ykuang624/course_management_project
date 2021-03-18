from flask import Flask, json, g, request
from flask import jsonify
import ast
import time
from repository import Repository
from repository.dbMysql import Database as sqldb
from section import SectionRequestManager
from course import CourseRequestManager
from student_section import StudentSectionRequestManager

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/authorize',methods=["POST"])
def authorize():
    pass

# This method get all course_section that matches the criteria
@app.route('/api/view_course', methods=["POST"])
def get_course():
    rv_final = jsonify({})
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        r_manager = SectionRequestManager(Repository(sqldb()))
        results, field_names = r_manager.read(cleaned_data)
        if results:
            rv = convert_sql(results, field_names)
            rv_final = jsonify(rv)
    return rv_final

# Update Course Information (Course only, not section)
@app.route('/api/modify_course', methods=["POST"])
def update_course():
    success = "Course Modification Failed"
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        course_id = cleaned_data["course_id"]
        del cleaned_data["course_id"]
        r_manager = CourseRequestManager(Repository(sqldb()))
        course_success = r_manager.modify(new_data=cleaned_data, course_id=course_id)
        if course_success:
            success = "Course Modification Succeeded!"
    return {'success': success}

@app.route('/api/modify_section', methods=["POST"])
def update_section():
    success = "Section Modification Failed"
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        section_id = cleaned_data["section_id"]
        del cleaned_data["section_id"]
        r_manager = SectionRequestManager(Repository(sqldb()))
        course_success = r_manager.modify(new_data=cleaned_data, section_id=section_id)
        if course_success:
            success = "Section Modification Succeeded!"
    return {'success': success}

@app.route('/api/delete_section', methods=["POST"])
def delete_section():
    success = "Section Deletion Failed"
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        section_id = cleaned_data["section_id"]
        #Find course id of that section
        r_manager = SectionRequestManager(Repository(sqldb()))
        results, fieldnames = r_manager.read(criteria={"sections.section_id":section_id})
        course_id = results[0][0]
        # TO DO: delete labs associated with session
        # Delete all students associated with sections
        section_id = cleaned_data["section_id"]
        section_success = delete_section_helper(section_id=section_id)

        if section_success:
            success = "Section Delete Succeeded!"
            # delete all sections related to that course
            results, fieldnames = r_manager.read(criteria={"sections.course_id":course_id})
            if len(results)>0:
                for section in results:
                    secion_id = section[5]
                    delete_section_helper(section_id=section_id)
                success = "Section Delete Succeeded! Also deleted the course"             
    return {'success': success}

@app.route('/api/delete_course', methods=["POST"])
def delete_course():
    success = "Course Deletion Failed"
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        # Find all sections associated with the course_id
        course_id = cleaned_data["course_id"]
        section_manager = SectionRequestManager(Repository(sqldb()))
        section_results, field_names = section_manager.read(criteria={"sections.course_id":course_id})
        # Delete all sections
        for section in section_results:
            section_id = section[5]
            delete_section_helper(section_id=section_id)
        # Delete the Course
        r_manager = CourseRequestManager(Repository(sqldb()))
        course_success = r_manager.delete(data=cleaned_data)
        if course_success:
            success = "Course Delete Succeeded!"
    return {'success': success}

# Create a course(and the first section)
@app.route('/api/create_course', methods=["POST"])
def create_course():
    success = "Course Creation Failed"
    if request.method == 'POST':
        cleaned_data = clean_data(request)
        r_manager = CourseRequestManager(Repository(sqldb()))
        # Separate the data into course and section part 
        course_data = {}
        section_data = {}
        for key, value in cleaned_data.items():
            if key.startswith("courses"):
                course_data[key] = value
            else:
                section_data[key] = value
        # Add course first
        course_success = r_manager.add(course_data)
        if course_success:
            # Get the course_id
            course_results, course_field_names = r_manager.read(criteria=course_data)
            course_info = convert_sql(course_results, course_field_names)
            course_id = course_info[0]["course_id"]
            section_data["course_id"] = course_id
            # add the section to the course
            section_manager = SectionRequestManager(Repository(sqldb()))
            section_success = section_manager.add(section_data)
            if section_success:
                success = "HOORAY! Course and Section Successfully Created"
            else:
                r_manager.delete(course_data)
                success = "Section Creation Failed, Course Deleted"
    return {'success': success}


def convert_sql(results, field_names):
    rv = [{} for _ in range(len(results))]
    for j in range(len(results)):
        for i in range(len(field_names)):
            if field_names[i] not in rv[j]:
                rv[j][field_names[i]] = results[j][i]
    return rv


def clean_data(request):
    req = request.get_data()
    dict_str = req.decode("UTF-8")
    data = ast.literal_eval(dict_str)
    cleaned_data = {}
    for key, value in data.items():
        if value != "":
            if "," in value:
                cleaned_data[key] = value.split(",")
            else:
                cleaned_data[key] = value
    return cleaned_data

def delete_section_helper(section_id):
    student_section_manager = StudentSectionRequestManager(Repository(sqldb()))
    student_section_manager.delete(data={"section_id":section_id})
    # Delete section
    r_manager = SectionRequestManager(Repository(sqldb()))
    section_success = r_manager.delete(data={"section_id":section_id})
    return section_success