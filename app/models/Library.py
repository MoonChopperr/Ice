from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime


class Library(db.Model):
    __tablename__ = "library"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    game_id = Column(Integer, ForeignKey(add_prefix_for_prod("game.id")), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="library")
    game = relationship("Game", back_populates="library")

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat(),
        }
