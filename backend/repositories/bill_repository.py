from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
import os
from backend.helpers.logger import logger
from backend.helpers.database import DatabaseHandler

# TODO: Add encryption to the database
logger.announcement('Initializing Bill Repository', 'info')

Base = declarative_base()

class Bill(Base):
    """Bill table"""
    __tablename__ = 'bills'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    amount = Column(Integer)
    dueDate = Column(String)
    paid = Column(Boolean, default=False)
    category = Column(String)
    renewal = Column(String)
    status = Column(String, default='pending')
    isAlertEnabled = Column(Boolean, default=False)
    alertDaysBefore = Column(Integer, default=3)

db_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'bill_repository.db')
db_url = f'sqlite:///{db_path}'

engine = create_engine(db_url)

db = DatabaseHandler(base=Base, engine=engine, type='sqlite')