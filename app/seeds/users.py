from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # 1
    demo = User(
        username='Demo', email='demo@aa.io', password='password', wallet= 400.00)
    # 2
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', wallet= 400.00)
    # 3
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', wallet= 400.00)
    # 4
    PapaCapcom = User(
        username='Capcom', email='Capcom@cap.io', password='password', wallet= 99999.00)
    # 5
    GodFatherSony = User(
        username='Sony', email='Sony@playstation.io', password='password', wallet= 99999.00)
    # 6
    Fromsoftware = User(
        username='FromSoft', email='FromSoft@bandai.io', password='password', wallet= 99999.00)
    # 7
    Konami = User(
        username='Konami', email='Konami@konami.io', password='password',  wallet= 99999.00)
    # 8
    ATLUS = User(
        username='ATLUS', email='ATLUS@SEGA.io', password='password', wallet= 99999.00)
    # 9
    MONKEYCRAFT = User(
        username='MKC', email='MKC@bandi.io', password='password', wallet= 99999.00)



    db.session.add_all([
        demo, marnie, bobbie, PapaCapcom, GodFatherSony, Fromsoftware, Konami, ATLUS, MONKEYCRAFT
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
