from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_games():
    MonterHunterWorld = Game(
        owner_id=4,
        title="Monster Hunter World",
        about="Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
        price=29.99,
        release_date=datetime(2018, 8, 8),
        developer="CAPCOM Co., Ltd.",
        publisher="CAPCOM Co., Ltd.",
        franchise="Monster Hunter",
        ESRB_rating="T",
        genre="Action",
        images="MHW.img",
    )

    ResidentEvil4 = Game(
        owner_id=4,
        title="Resident Evil 4",
        about="Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
        price=39.99,
        release_date=datetime(2023, 3, 23),
        developer="CAPCOM Co., Ltd.",
        publisher="CAPCOM Co., Ltd.",
        franchise="Resident Evil",
        ESRB_rating="M",
        genre="Action, Adventure",
        images="RE4.img",
    )

    DragonsDogma2 = Game(
        owner_id=4,
        title="Dragon's Dogma 2",
        about="Dragon’s Dogma 2 is a single player, narrative driven action-RPG that challenges the players to choose their own experience – from the appearance of their Arisen, their vocation, their party, how to approach different situations and more - in a truly immersive fantasy world.",
        price=69.99,
        release_date=datetime(2024, 3, 21),
        developer="CAPCOM Co., Ltd.",
        publisher="CAPCOM Co., Ltd.",
        franchise="Dragon's Dogma",
        ESRB_rating="M",
        genre="Action, RPG",
        images="DD2.img",
    )

    DevilMayCry5 = Game(
        owner_id=4,
        title="Devil May Cry 5",
        about="The ultimate Devil Hunter is back in style, in the game action fans have been waiting for.",
        price=29.99,
        release_date=datetime(2019, 3, 7),
        developer="CAPCOM Co., Ltd.",
        publisher="CAPCOM Co., Ltd.",
        franchise="Devil May Cry",
        ESRB_rating="M",
        genre="Action",
        images="DMC5.img",
    )

    Persona5 = Game(
        owner_id=8,
        title="Persona 5 Royal",
        about="Don the mask and join the Phantom Thieves of Hearts as they stage grand heists, infiltrate the minds of the corrupt, and make them change their ways!",
        price=59.99,
        release_date=datetime(2022, 10, 21),
        developer="ATLUS",
        publisher="SEGA",
        franchise="Persona",
        ESRB_rating="M",
        genre="RPG",
        images="p5.img",
    )
    db.session.add_all([MonterHunterWorld, ResidentEvil4, DragonsDogma2, DevilMayCry5, Persona5])

    db.session.commit()


def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
