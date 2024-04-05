from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, String, Integer, Numeric
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    username = Column(String(32), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    wallet = Column(Numeric(12,2))

    shopping_carts = relationship("ShoppingCart", back_populates="users", cascade="all, delete-orphan")
    games = relationship("Game", back_populates="owner", cascade="all, delete-orphan")
    wishlist = relationship("Wishlist", back_populates="users", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'wallet': float(self.wallet),
        }
