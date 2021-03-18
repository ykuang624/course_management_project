from abc import ABC, abstractmethod


class RequestManager:
    '''
    Parent class of all request managers
    '''
    def __init__(self, db, table):
        self.db = db
        self.table = table
    
    def add(self, data):
        '''
        Input:
            data(dictionary)
        '''
        success = self.db.create(data=data, table=self.table)
        return success

    def delete(self, data):
        success = self.db.delete(criteria=data, table=self.table)
        return success
    
    def read(self, criteria):
        select = [" * "]
        tables = [self.table]
        results, field_names = self.db.find(select=select, from_tables={"tables":tables}, criteria=criteria, limit=None)
        return results, field_names

