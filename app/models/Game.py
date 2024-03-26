from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Game(db.Model):
    __tablename__='Game'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    title= Column(String(100), nullable = False)
    about = Column(String(2000), nullable = False)
    price = Column(Numeric(10,2), nullable = False)
    release_date = Column(DateTime, nullable = False)
    developer = Column(String(100), nullable = False)
    publisher = Column(String(100), nullable = False)
    franchise = Column(String(100))
    ESRB_rating = Column(String(5))
    genre = Column(String(300))
    images = Column(String(255))
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="games")
    shopping_carts = relationship("ShoppingCart", back_populates="game")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'about': self.about,
            'price': float(self.price),
            'release_date': self.release_date.date().isoformat(),
            'developer': self.developer,
            'publisher': self.publisher,
            'franchise': self.franchise,
            'ESRB_rating': self.ESRB_rating,
            'genre': self.genre,
            'images': self.images,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat(),
        }
