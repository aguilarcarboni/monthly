logger.announcement('Initializing User Service', 'info')

from app.helpers.logger import logger
from app.helpers.response import Response
from app.repositories.user_repository import User, create, delete, read

class UserService:

    def __init__(self):
        pass

    def createUser(self, user: User):
        try:
            response = create(data=user)
            return Response.success(response)
        except Exception as e:
            return Response.error(e)

    def deleteUser(self, userID: str):
        try:
            response = delete(params={"id": userID})
            return Response.success(response)
        except Exception as e:
            return Response.error(e)
        
    def findAll(self):
        try:
            response = read()
            return Response.success(response)
        except Exception as e:
            return Response.error(e)
        
logger.announcement('User Service initialized', 'success')