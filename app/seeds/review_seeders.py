from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        user_id=2,
        game_id=1,
        review="The graphics are stunning, but the gameplay is lacking.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review2 = Review(
        user_id=2,
        game_id=2,
        review="Not worth the money. I regret buying it.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review3 = Review(
        user_id=2,
        game_id=3,
        review="I can't stop playing this game! It's so addictive.",
        rating=1,
        helpful=15,
        funny=8,
    )

    review4 = Review(
        user_id=2,
        game_id=4,
        review="This game is a disappointment. I expected more from it.",
        rating=-1,
        helpful=3,
        funny=1,
    )

    review5 = Review(
        user_id=2,
        game_id=5,
        review="Best game I've played in years! Highly recommend.",
        rating=1,
        helpful=20,
        funny=10,
    )

    review6 = Review(
        user_id=3,
        game_id=1,
        review="The graphics are stunning, but the gameplay is lacking.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review7 = Review(
        user_id=3,
        game_id=2,
        review="Not worth the money. I regret buying it.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review8 = Review(
        user_id=3,
        game_id=3,
        review="I can't stop playing this game! It's so addictive.",
        rating=1,
        helpful=15,
        funny=8,
    )

    review9 = Review(
        user_id=3,
        game_id=4,
        review="This game is a disappointment. I expected more from it.",
        rating=-1,
        helpful=3,
        funny=1,
    )

    review10 = Review(
        user_id=3,
        game_id=5,
        review="Best game I've played in years! Highly recommend.",
        rating=1,
        helpful=20,
        funny=10,
    )

    review11 = Review(
        user_id=4,
        game_id=1,
        review="The graphics are stunning, but the gameplay is lacking.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review12 = Review(
        user_id=4,
        game_id=2,
        review="Not worth the money. I regret buying it.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review13 = Review(
        user_id=4,
        game_id=3,
        review="I can't stop playing this game! It's so addictive.",
        rating=1,
        helpful=15,
        funny=8,
    )

    review14 = Review(
        user_id=4,
        game_id=4,
        review="This game is a disappointment. I expected more from it.",
        rating=-1,
        helpful=3,
        funny=1,
    )

    review15 = Review(
        user_id=4,
        game_id=5,
        review="Best game I've played in years! Highly recommend.",
        rating=1,
        helpful=20,
        funny=10,
    )

    review16 = Review(
        user_id=5,
        game_id=1,
        review="The graphics are stunning, but the gameplay is lacking.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review17 = Review(
        user_id=5,
        game_id=2,
        review="Not worth the money. I regret buying it.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review18 = Review(
        user_id=5,
        game_id=3,
        review="I can't stop playing this game! It's so addictive.",
        rating=1,
        helpful=15,
        funny=8,
    )

    review19 = Review(
        user_id=5,
        game_id=4,
        review="This game is a disappointment. I expected more from it.",
        rating=-1,
        helpful=3,
        funny=1,
    )

    review20 = Review(
        user_id=5,
        game_id=5,
        review="Best game I've played in years! Highly recommend.",
        rating=1,
        helpful=20,
        funny=10,
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10,review11, review12, review13, review14, review15, review16, review17, review18, review19, review20])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
