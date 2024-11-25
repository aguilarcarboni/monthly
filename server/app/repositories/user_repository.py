logger.announcement('Initializing User Repository', 'info')

from sqlalchemy import create_engine, Column, Integer, String, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
import os

from app.helpers.logger import logger
from app.helpers.response import Response

from functools import wraps

Base = declarative_base()

class User(Base):
    """User table"""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String)
    name = Column(String)
    image = Column(String)
    password = Column(String)

db_name = 'user_repository'
db_path = os.path.join(os.path.dirname(__file__), '..', 'db', f'{db_name}.db')
db_url = f'sqlite:///{db_path}'

engine = create_engine(db_url)
Base.metadata.create_all(engine)

metadata = MetaData()
metadata.reflect(bind=engine)

def with_session(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        session = Session(bind=engine)
        try:
            result = func(session, *args, **kwargs)
            session.commit()
            return result
        except Exception as e:
            session.rollback()
            logger.error(f"Database error in {func.__name__}: {str(e)}")
            return Response.error(f"Database error: {str(e)}")
        finally:
            session.close()
    return wrapper

@with_session
def create(session, data: dict):
    logger.info(f'Attempting to create new entry in table: users')
    try:
        tbl = Table('users', metadata, autoload_with=engine)
        new_record = tbl.insert().values(**data)
        result = session.execute(new_record)
        session.flush()
        new_id = result.inserted_primary_key[0]
        logger.success(f'Successfully created entry with id: {new_id}')
        return {'id': new_id}
    except Exception as e:
        logger.error(f'Error creating record: {str(e)}')
        raise Exception(e)

@with_session
def read(session, params: dict = None):
    logger.info(f'Attempting to read entry from table: Users')
    
    try:
        tbl = Table('users', metadata, autoload_with=engine)
        query = session.query(tbl)

        if params:
            for key, value in params.items():
                if hasattr(tbl.c, key):
                    query = query.filter(getattr(tbl.c, key) == value)
            
        results = query.all()

        serialized_results = [row._asdict() for row in results]
        
        logger.success(f'Successfully read {len(serialized_results)} entries from table: Users')
        return serialized_results
    
    except SQLAlchemyError as e:
        logger.error(f'Error reading from database: {str(e)}')
        raise Exception(e)

@with_session
def delete(session, params: dict):
    logger.info(f'Attempting to delete entry from table: Users')
    
    try:
        tbl = Table('users', metadata, autoload_with=engine)
        query = session.query(tbl)

        for key, value in params.items():
            if hasattr(tbl.c, key):
                query = query.filter(getattr(tbl.c, key) == value)

        item = query.first()
        if not item:
            return Response.error(f"Users with given parameters not found")

        delete_stmt = tbl.delete().where(tbl.c.id == item.id)
        session.execute(delete_stmt)
        session.flush()

        logger.success(f"Successfully deleted Users with id: {item.id}")
        return {'id': item.id}
    except SQLAlchemyError as e:
        logger.error(f"Error deleting Users: {str(e)}")
        raise

logger.announcement('User Repository initialized', 'success')