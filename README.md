## Yue Kuang
## 2021 March

Hey Graders
Just in case you are not able to open my frontend. Here is the video link of my recording of running the app: https://drive.google.com/file/d/1zWSVShcExhlbUfkRhXZWOIGgnm8pLJtT/view?usp=sharing. I hope it will help.
My backend codes(including tests) are all inside the backend folder. 

# Introduction
This is the administrator part of the course management system. The administrator can add new courses to the current set of course offerings, modify courses and sections, delete courses, add/modify/delete students and instructors in the system, open/close registration, add/delete building/time resources for the system.
The administrator also has the authorization funcionality. This project has the MongoDB database that helps to find the user info in the back end, but it doesn't implement the authrization process in the front end. 


# Loading Data
## 1. MySQL
Step1: To initiate schemas, run the database_schema/initiate.sql file in MySQL shell.

Step2: To get the data, you will need to load the file located at: database_schema/load_data.sql to import all the csv files saved in the same folder.
Don't forget to change the path to those csv files to your local computer's path.
If this doesn't work, you can also use DBeaver to import csv file into tthe tables.

## 2.MongoDB
Step1: You will need to first create a database called "login" with a collection also called "login" in mongoDB.
Then you can run the following code to import the csv file (Note: you will need to change the path here based on where the file is store on your computer).
mongoimport --db login --collection login --type csv --headerline --ignoreBlanks --file /Users/ykuang/Desktop/2020-2021Winter/oop/final_project/react-flask-app/database_schema/login.csv

## 3.Start the Front End and Back End together
(Note: I am using flask and react here to display my course management system)

Inside the react_flask_app folder, type "yarn start" to run the front end.

Next, open another terminal, type "yarn start-api" in the same folder to fire up the back end. 
Your browser should automatically open "http://localhost:3000/" to show the app. 

## 4. Test
Due to time concern, I wasn't able to finish all functionalities' front end. The rest of the functionality can be tested through the mainTest.py and backend/repository/dbMongo.py. You can run them through `python mainTest.py` and `python dbMongo.py`.