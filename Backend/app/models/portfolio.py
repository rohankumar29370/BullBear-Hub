from sqlalchemy import Column, Integer, String
from app.db import Base

class Portfolio(Base):
    __tablename__ = "Portfolio"

    id = Column(Integer, primary_key=True, nullable = False, autoincrement=True)
    name = Column(String, nullable=False)
    strategy = Column(String, nullable=False)
    userId= Column(Integer, nullable=False)

    def __str__(self):
        return f"[id: {self.id}, name: {self.name}, strategy: {self.strategy}]"
    