from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_id = Column(Integer, ForeignKey(add_prefix_for_prod('game.id')), nullable=False)
    review = Column(String(2000), nullable=False)
    rating = Column(Integer, nullable=False)
    helpful = Column(Integer)
    funny = Column(Integer)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    users = relationship('User', back_populates='reviews')
    game = relationship('Game', back_populates='reviews')

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'game_id': self.game_id,
        'review': self.review,
        'rating': self.rating,
        'helpful': self.helpful,
        'funny': self.funny,
        'createdAt': self.createdAt,
        'updatedAt': self.updatedAt
        }
