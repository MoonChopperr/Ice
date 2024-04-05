from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime, event
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Wishlist(db.Model):
    __tablename__ = "wishlist"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(
        Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    game_id = Column(
        Integer, ForeignKey(add_prefix_for_prod("game.id")), nullable=False
    )
    rank = Column(Integer)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    users = relationship("User", back_populates="wishlist")
    game = relationship("Game", back_populates="wishlist")

    # decorator for rank attribute
    # @validates('rank')
    # def rank_icrement(self, key, rank):
    #     if rank is not None:
    #         items_to_update = Wishlist.query.filter_by(user_id=self.user_id).filter(Wishlist.rank >=rank).all()
    #         for item in items_to_update:
    #            item.rank+=1
    #     return rank

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            'rank': self.rank,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat(),
        }

        # event listener when rank changes
    # def update_ranks(target, value, oldvalue, initiator):
    #     target.validate_rank('rank', value)
