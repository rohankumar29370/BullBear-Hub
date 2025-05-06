from app.models.portfolio import Portfolio
from app.db import get_session

def create_new(name, strategy, userId):
    portfolio = Portfolio(name=name, strategy=strategy, userId=userId)
    with get_session() as session:
        session.add(portfolio)
        session.commit()
    return portfolio


def get_portfolio_by_user(userId):
        return  get_session().query(Portfolio).filter(Portfolio.userId == userId).all() #creating session and getting all portfolios for a user in same line.
    

def get_portfolio_by_id(id):
    return get_session().query(Portfolio).filter(Portfolio.id == id).all() #creating session and getting all portfolios for a user in same line.