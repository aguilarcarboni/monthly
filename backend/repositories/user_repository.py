from sqlalchemy import create_engine, Column, Integer, String, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
import os

from backend.helpers.logger import logger
from backend.helpers.response import Response
from backend.helpers.database import DatabaseHandler

from functools import wraps

logger.announcement('Initializing User Repository', 'info')

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

db = DatabaseHandler(base=Base, engine=engine, type='sqlite')