from app.db import get_session
from app.models.user import User

def create_user(username, password, balance):
    user= User(username=username, password=password, balance=balance)
    with get_session() as session:
        session.add(user)
        session.commit()

def password_matches(username, password):
    session = get_session()
    users = session.query(User).filter(User.username == username).all()
    if len(users) == 0 or len(users) > 1:
        return False
    user = users[0]
    return password == user.password
    
        
def get_all():
    session = get_session()
    return session.query(User).all()

def get_active():
    session = get_session()
    return session.query(User).filter(User.is_active == True).all()

def get_balance(userId):
    session = get_session()
    users = session.query(User).filter(User.id == userId).all()
    if len(users) == 0:
        return 0
    else:
        return users[0].balance
    
def update_balance(userId, balance):
    with get_session() as session:
        users = session.query(User).filter(User.id == userId).all()
        if len(users) == 0:
         return None
        else:
         user = users[0]
         user.balance = balance
         session.commit()
         