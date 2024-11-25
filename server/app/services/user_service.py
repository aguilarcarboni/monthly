from app.helpers.logger import logger
from app.helpers.response import Response
from backend.repositories.user_repository import User, db

logger.announcement('Initializing User Service', 'info')
logger.announcement('User Service initialized', 'success')

class UserService:

    def __init__(self):
        pass

    def createUser(self, user: User):
        try:
            response = db.create(table='users', data=user)
            return Response.success(response)
        except Exception as e:
            return Response.error(e)

    def deleteUser(self, userID: str):
        try:
            response = db.delete(table='users', params={"id": userID})
            return Response.success(response)
        except Exception as e:
            return Response.error(e)
        
    def findAll(self):
        try:
            response = db.read(table='users')
            return Response.success(response)
        except Exception as e:
            return Response.error(e)