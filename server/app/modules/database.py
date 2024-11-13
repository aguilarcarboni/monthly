from sqlalchemy import create_engine, Column, Integer, String, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from app.helpers.logger import logger
from app.helpers.response import Response
import os
from functools import wraps

Base = declarative_base()

class Interest(Base):
    """Interest class"""
    __tablename__ = 'interests'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    keywords = Column(String)

logger.announcement('Initializing Database Service', 'info')

db_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'news.db')
db_url = f'sqlite:///{db_path}'

engine = create_engine(db_url)
Base.metadata.create_all(engine)

metadata = MetaData()
metadata.reflect(bind=engine)
logger.announcement('Database Service initialized', 'success')

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
def create(session, table: str, data: dict):
    logger.info(f'Attempting to create new entry in table: {table}')

    try:
        tbl = Table(table, metadata, autoload_with=engine)
        new_record = tbl.insert().values(**data)
        result = session.execute(new_record)
        session.flush()
        new_id = result.inserted_primary_key[0]
        logger.success(f'Successfully created entry with id: {new_id}')
        return Response.success({'id': new_id, 'message': 'Entry created successfully'})
    except SQLAlchemyError as e:
        logger.error(f'Error creating record: {str(e)}')
        return Response.error(f'Database error: {str(e)}')

@with_session
def update(session, table: str, params: dict, data: dict):
    logger.info(f'Attempting to update entry in table: {table}')
    
    try:
        tbl = Table(table, metadata, autoload_with=engine)
        query = session.query(tbl)

        for key, value in params.items():
            if hasattr(tbl.c, key):
                query = query.filter(getattr(tbl.c, key) == value)

        item = query.first()

        if not item:
            return Response.error(f"{table.capitalize()} with given parameters not found")

        query.update(data)
        session.flush()

        updated_item = query.first()
        logger.success(f"Successfully updated {table} with new data {updated_item._asdict()}")
        return Response.success(f"Successfully updated {table} with new data {updated_item._asdict()}")
    except SQLAlchemyError as e:
        logger.error(f"Error updating {table}: {str(e)}")
        raise

@with_session
def read(session, table: str, params: dict = None):
    logger.info(f'Attempting to read entry from table: {table}')
    
    try:
        tbl = Table(table, metadata, autoload_with=engine)
        query = session.query(tbl)

        if params:
            for key, value in params.items():
                if hasattr(tbl.c, key):
                    query = query.filter(getattr(tbl.c, key) == value)
            
        results = query.all()

        serialized_results = [row._asdict() for row in results]
        
        logger.success(f'Successfully read {len(serialized_results)} entries from table: {table}')
        return Response.success(serialized_results)
    except SQLAlchemyError as e:
        logger.error(f'Error reading from database: {str(e)}')
        raise

@with_session
def delete(session, table: str, params: dict):
    logger.info(f'Attempting to delete entry from table: {table}')
    
    try:
        tbl = Table(table, metadata, autoload_with=engine)
        query = session.query(tbl)

        for key, value in params.items():
            if hasattr(tbl.c, key):
                query = query.filter(getattr(tbl.c, key) == value)

        item = query.first()
        if not item:
            return Response.error(f"{table.capitalize()} with given parameters not found")

        delete_stmt = tbl.delete().where(tbl.c.id == item.id)
        session.execute(delete_stmt)
        session.flush()

        logger.success(f"Successfully deleted {table} with id: {item.id}")
        return Response.success(f"{table.capitalize()} deleted successfully")
    except SQLAlchemyError as e:
        logger.error(f"Error deleting {table}: {str(e)}")
        raise