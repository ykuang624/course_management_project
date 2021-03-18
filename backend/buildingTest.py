from buildings import BuildingRequestManager

class BuildingTest:

    def __init__(self, db):
        self.db = db
        self.manager = BuildingRequestManager(self.db)
   
    
    def addTest(self):
        data = {"building_name":"Rose Museum"}
        add_success = self.manager.add(data=data)
        expected = True
        if add_success == expected:
            print("add building test passed")
            return True
        else:
            print("add building test failed")  
            return False

    def readTest(self):
        criteria = {"building_name":"Rose Museum"}
        results, field_names = self.manager.read(criteria=criteria)
        if results != []:
            print("building read test passed")
            return True
        else:
            print("building read test failed")
            return False

    def deleteTest(self):

        data = {"building_name":"Rose Museum"}
        # self.manager.add(data=data)
        delete_success = self.manager.delete(data=data)
        if delete_success == True:
            print("delete building test passed")
            return True
        else:
            print("delete building test failed")  
            return False
