from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from typing import List
from app.helpers.logger import logger
from app.helpers.response import Response
import os

Base = declarative_base()

class Interest(Base):
    """Interest class"""
    __tablename__ = 'interests'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    keywords = Column(String)

class Database:

    def __init__(self):
        
        logger.announcement('Initializing Database Service', 'info')

        db_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'news.db')
        db_url = f'sqlite:///{db_path}'

        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)

        self.add_interest('Technology', ['AI', 'machine learning', 'deep learning', 'neural networks', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks', 'artificial intelligence'])
        self.add_interest('Business', ['stock market', 'investing', 'finance', 'economy', 'markets', 'business', 'economics', 'market', 'stocks', 'investing', 'finance', 'economy', 'markets', 'business', 'economics', 'market', 'stocks', 'investing', 'finance', 'economy', 'markets', 'business', 'economics', 'market', 'stocks'])

        logger.announcement('Database Service initialized', 'success')
    
    def add_interest(self, interest: str, keywords: List[str]):
        """Add a new interest category with keywords"""
        logger.info(f'Adding interest: {interest} with keywords: {keywords}')
        with Session(self.engine) as session:
            interest_obj = session.query(Interest).filter_by(name=interest).first()
            if not interest_obj:
                interest_obj = Interest(name=interest, keywords=','.join(keywords))
                session.add(interest_obj)
                session.commit()
                logger.success(f'Added interest: {interest} with keywords: {keywords}')
                return Response.success(f'Added interest: {interest} with keywords: {keywords}')
            else:
                logger.error(f'Interest: {interest} already exists')
                return Response.error(f'Interest: {interest} already exists')
    
    def remove_interest(self, interest: str):
        """Remove an interest category"""
        logger.info(f'Removing interest: {interest}')
        with Session(self.engine) as session:
            try:
                interest_obj = session.query(Interest).filter_by(name=interest).first()
                if interest_obj:
                    session.delete(interest_obj)
                    session.commit()
                    logger.success(f'Removed interest: {interest}')
                    return Response.success(f'Removed interest: {interest}')
                else:
                    logger.error(f'Interest: {interest} does not exist')
                    return Response.error(f'Interest: {interest} does not exist')
            except Exception as e:
                logger.error(f'Error removing interest: {interest}: {e}')
                return Response.error(f'Error removing interest: {interest}: {e}')
            
    def get_interests(self) -> List[dict]:
        """Get all stored interests"""
        logger.info('Getting interests')
        with Session(self.engine) as session:
            try:
                interests = session.query(Interest).all()
                logger.success('Successfully retrieved interests')
                return [{'name': i.name, 'keywords': i.keywords.split(',')} for i in interests]
            except Exception as e:
                logger.error(f'Error getting interests: {e}')
                return Response.error(f'Error getting interests: {e}')