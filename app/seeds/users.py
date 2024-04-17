from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # 1
    demo = User(
        username='Demo', email='demo@aa.io', password='password', wallet= 400.00)
    # 2
    marnie = User(
        username='Kaizer', email='marnie@aa.io', password='password', wallet= 400.00)
    # 3
    bobbie = User(
        username='Rift', email='bobbie@aa.io', password='password', wallet= 400.00)
    # 4
    Albert = User(
        username='ALBERT1983', email='albert@aa.io', password='password', wallet= 99999.00)
    # 5
    Honk = User(
        username='Honk', email='honk@aa.io', password='password', wallet= 99999.00)
    # 6
    Lisan = User(
        username='AlGaib', email='Lisan@aa.io', password='password', wallet= 99999.00)

    PapaCapcom = User(
        username='Capcom', email='Capcom@cap.io', password='password', wallet= 99999.00)

    GodFatherSony = User(
        username='Sony', email='Sony@playstation.io', password='password', wallet= 99999.00)

    Fromsoftware = User(
        username='FromSoft', email='FromSoft@bandai.io', password='password', wallet= 99999.00)

    Konami = User(
        username='Konami', email='Konami@konami.io', password='password',  wallet= 99999.00)

    ATLUS = User(
        username='ATLUS', email='ATLUS@SEGA.io', password='password', wallet= 99999.00)

    MONKEYCRAFT = User(
        username='MKC', email='MKC@bandi.io', password='password', wallet= 99999.00)
    # 10




    db.session.add_all([
        demo, marnie, bobbie, PapaCapcom, GodFatherSony, Fromsoftware, Konami, ATLUS, MONKEYCRAFT, Albert, Honk, Lisan
    ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
