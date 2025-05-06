from sqlalchemy import Column, Integer,String, Boolean, Float
from app.db import Base

class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, autoincrement = True)
    username = Column(String, nullable =False)
    password = Column(String, nullable =False)
    is_active = Column(Boolean, default=True)
    balance= Column(Float)



