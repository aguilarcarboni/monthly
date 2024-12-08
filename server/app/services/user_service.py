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
            logger.info(f'Creating user: {user}')

            logger.info(f'Encoding password using utf-8')
            user['password'] = user['password'].encode('utf-8')

            response = db.create(table='users', data=user)
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error creating user: {e}')
            return Response.error(e)

    def deleteUser(self, userID: str):
        try:
            logger.info(f'Deleting user: {userID}')
            response = db.delete(table='users', params={"id": userID})
            return Response.success(response)
        except Exception as e:
            logger.error(f'Error deleting user: {e}')
            return Response.error(e)
        
    def findAll(self):
        try:
            logger.info(f'Finding all users')
            response = db.read(table='users')

            logger.info(f'Decoding passwords using utf-8')
            for user in response:
                user['password'] = user['password'].decode('utf-8')

            return Response.success(response)
        except Exception as e:
            logger.error(f'Error finding all users: {e}')
            return Response.error(e)