from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class ShoppingCart(db.Model):
    __tablename__='shopping_cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_id = Column(Integer, ForeignKey(add_prefix_for_prod('game.id')), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    users = relationship("User", back_populates="shopping_carts")
    game = relationship("Game", back_populates="shopping_carts")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat(),
        }
