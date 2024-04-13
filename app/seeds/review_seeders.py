from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        user_id=1,
        game_id=1,
        review="This game is amazing! I love the graphics and gameplay.",
        rating=1,
        helpful=10,
        funny=5,
    )

    review2 = Review(
        user_id=1,
        game_id=2,
        review="The story is engaging, but the gameplay could be improved.",
        rating=-1,
        helpful=7,
        funny=3,
    )

    review3 = Review(
        user_id=1,
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
        user_id=2,
        game_id=1,
        review="The graphics are stunning, but the gameplay is lacking.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review7 = Review(
        user_id=3,
        game_id=1,
        review="I'm addicted to this game! Can't get enough of it.",
        rating=1,
        helpful=12,
        funny=6,
    )

    review8 = Review(
        user_id=3,
        game_id=2,
        review="Not worth the money. I regret buying it.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review9 = Review(
        user_id=3,
        game_id=3,
        review="A masterpiece! Everything about this game is perfect.",
        rating=1,
        helpful=18,
        funny=9,
    )

    review10 = Review(
        user_id=3,
        game_id=4,
        review="I expected more from this game. It's just okay.",
        rating=-1,
        helpful=4,
        funny=2,
    )
    review11 = Review(
        user_id=1,
        game_id=4,
        review="Great game with a compelling story.",
        rating=1,
        helpful=8,
        funny=3,
    )

    review12 = Review(
        user_id=1,
        game_id=5,
        review="Enjoyable gameplay but lacks depth in the story.",
        rating=-1,
        helpful=5,
        funny=2,
    )

    review13 = Review(
        user_id=1,
        game_id=6,
        review="Addictive gameplay and stunning visuals.",
        rating=1,
        helpful=10,
        funny=4,
    )

    review14 = Review(
        user_id=2,
        game_id=1,
        review="Disappointing game. Not worth the price.",
        rating=-1,
        helpful=2,
        funny=1,
    )

    review15 = Review(
        user_id=2,
        game_id=2,
        review="One of the best games I've played recently. Highly recommend.",
        rating=1,
        helpful=15,
        funny=7,
    )

    review16 = Review(
        user_id=2,
        game_id=3,
        review="The graphics are good, but the gameplay gets repetitive.",
        rating=-1,
        helpful=4,
        funny=2,
    )

    review17 = Review(
        user_id=3,
        game_id=5,
        review="Can't stop playing this game. It's addictive!",
        rating=1,
        helpful=13,
        funny=5,
    )

    review18 = Review(
        user_id=3,
        game_id=6,
        review="Waste of money. Wouldn't recommend.",
        rating=-1,
        helpful=1,
        funny=0,
    )

    review19 = Review(
        user_id=3,
        game_id=7,
        review="Excellent game with challenging gameplay.",
        rating=1,
        helpful=20,
        funny=8,
    )

    review20 = Review(
        user_id=3,
        game_id=8,
        review="Expected more from this game. It's average.",
        rating=-1,
        helpful=3,
        funny=1,
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10,review11, review12, review13, review14, review15, review16, review17, review18, review19, review20])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
