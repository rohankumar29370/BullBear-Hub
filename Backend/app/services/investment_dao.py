from app.models.investment import Investment
from app.services.user_dao import get_balance, update_balance
from app.services.portfolio_dao import get_portfolio_by_id
from datetime import date
from app.db import get_session


def create_new(portfolio_id, ticker, price, quantity):
    portfolios = get_portfolio_by_id(portfolio_id)
    if len(portfolios) == 0:
        return None
    userId = portfolios[0].userId
    balance = get_balance(userId)
    purchase_price = price * quantity
    if balance < purchase_price:
        raise Exception("No sufficient funds")
    investment = Investment(portfolio_id=portfolio_id, ticker=ticker, price=price, quantity=quantity, date= date.today())
    with get_session() as session:
        session.add(investment)
        session.commit()
        update_balance(userId, balance-purchase_price)
    return investment


