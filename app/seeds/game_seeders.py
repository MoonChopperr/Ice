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
        genre="Action,Adventure",
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
        genre="Action,RPG",
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

    Persona4 = Game(
        owner_id=8,
        title="Persona 4 Golden",
        about="A coming of age story that sets the protagonist and his friends on a journey kickstarted by a chain of serial murders.",
        price=19.99,
        release_date=datetime(2020, 6, 13),
        developer="ATLUS",
        publisher="SEGA",
        franchise="Persona",
        ESRB_rating="M",
        genre="RPG",
        images="p4.img",
    )

    Persona3 = Game(
        owner_id=8,
        title="Persona 3 Reload",
        about="Dive into the Dark Hour and awaken the depths of your heart. Persona 3 Reload is a captivating reimagining of the genre-defining RPG, reborn for the modern era with cutting-edge graphics and gameplay.",
        price=69.99,
        release_date=datetime(2024, 2, 2),
        developer="ATLUS",
        publisher="SEGA",
        franchise="Persona",
        ESRB_rating="M",
        genre="Adventure,RPG,Strategy",
        images="p3.img",
    )

    HELLDIVERS2 = Game(
        owner_id=5,
        title="HELLDIVERS2",
        about="The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.",
        price=39.99,
        release_date=datetime(2024, 2, 8),
        developer="Arrowhead Game Studios",
        publisher="PlayStation PC LLC",
        franchise="PlayStation Studios, HELLDIVERS",
        ESRB_rating="M",
        genre="Action",
        images="HD.img",
    )

    GhostofTsushimaa = Game(
        owner_id=5,
        title="Ghost Of Tsushima DIRECTOR'S CUT",
        about="A storm is coming. Venture into the complete Ghost of Tsushima DIRECTOR’S CUT on PC; forge your own path through this open-world action adventure and uncover its hidden wonders. Brought to you by Sucker Punch Productions, Nixxes Software and PlayStation Studios.",
        price=59.99,
        release_date=datetime(2024, 5, 16),
        developer="Sucker Punch Productions",
        publisher="PlayStation PC LLC",
        ESRB_rating="M",
        genre="Action",
        images="GoT.img",
    )

    HorizonForbiddenWest = Game(
        owner_id=5,
        title="Horizon Forbidden West Complete Edition",
        about="Experience the epic Horizon Forbidden West™ in its entirety with bonus content and the Burning Shores expansion included. The Burning Shores add-on contains additional content for Aloy’s adventure, including new storylines, characters, and experiences in a stunning yet hazardous new area.",
        price=59.99,
        release_date=datetime(2024, 3, 21),
        developer="Guerrilla",
        publisher="PlayStation PC LLC",
        franchise='PlayStation Studios, Horizon',
        ESRB_rating="T",
        genre="Action,RPG",
        images="HBW.img",
    )

    DarkSouls = Game(
        owner_id=6,
        title="DARK SOULS: REMASTERED",
        about="Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all. Beautifully remastered, return to Lordran in stunning high-definition detail running at 60fps.",
        price=39.99,
        release_date=datetime(2018, 3, 23),
        developer="FromSoftware Inc.",
        publisher="FromSoftware Inc.",
        franchise='FRANCHISE',
        ESRB_rating="M",
        genre="Action,RPG",
        images="DS.img",
    )

    DarkSouls2 = Game(
        owner_id=6,
        title="DARK SOULS II",
        about="Developed by FROM SOFTWARE, DARK SOULS™ II is the highly anticipated sequel to the gruelling 2011 breakout hit Dark Souls. The unique old-school action RPG experience captivated imaginations of gamers worldwide with incredible challenge and intense emotional reward.",
        price=24.99,
        release_date=datetime(2014, 4, 25),
        developer="FromSoftware Inc.",
        publisher="FromSoftware Inc.",
        franchise='FRANCHISE',
        ESRB_rating="M",
        genre="Action,RPG",
        images="DS2.img",
    )

    DarkSouls3 = Game(
        owner_id=6,
        title="DARK SOULS III",
        about="Dark Souls continues to push the boundaries with the latest, ambitious chapter in the critically-acclaimed and genre-defining series. Prepare yourself and Embrace The Darkness!",
        price=59.99,
        release_date=datetime(2016, 4, 11),
        developer="FromSoftware Inc.",
        publisher="FromSoftware Inc.",
        franchise='FRANCHISE',
        ESRB_rating="M",
        genre="Action,RPG",
        images="DS3.img",
    )

    EldenRing = Game(
        owner_id=6,
        title="ELDEN RIING",
        about="THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        price=59.99,
        release_date=datetime(2022, 2, 24),
        developer="FromSoftware Inc.",
        publisher="FromSoftware Inc.",
        franchise='Bandai Namco Entertainment',
        ESRB_rating="M",
        genre="Action,RPG",
        images="ER.img",
    )

    ARMOREDCORE = Game(
        owner_id=6,
        title="ARMORED CORE VI FIRES OF RUBICON",
        about="A new action game based on the concept of the ARMORED CORE series that uses the knowledge gained from FromSoftware's recent action game development.",
        price=59.99,
        release_date=datetime(2023, 8, 24),
        developer="FromSoftware Inc.",
        publisher="FromSoftware Inc.",
        franchise='Bandai Namco Entertainment',
        ESRB_rating="T",
        genre="Action",
        images="AC.img",
    )

    Sekiro = Game(
        owner_id=6,
        title="Sekiro: Shadows Die Twice - GOTY Edition",
        about="Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.",
        price=59.99,
        release_date=datetime(2023, 8, 24),
        developer="FromSoftware Inc.",
        publisher="Activision (Excluding Japan and Asia)",
        ESRB_rating="M",
        genre="Action,Adventure",
        images="Sekiro.img",
    )

    MGR = Game(
        owner_id=7,
        title="METAL GEAR RISING: REVENGEANCE",
        about="Developed by Kojima Productions and PlatinumGames, METAL GEAR RISING: REVENGEANCE takes the renowned METAL GEAR franchise into exciting new territory with an all-new action experience. The game seamlessly melds pure action and epic story-telling that surrounds Raiden – a child soldier transformed into a half-human, half-cyborg ninja who uses his High Frequency katana blade to cut through any thing that stands in his vengeful path!",
        price=29.99,
        release_date=datetime(2014, 1, 9),
        developer="PlatinumGames",
        publisher="KONAMI",
        ESRB_rating="M",
        genre="Action",
        images="MGR.img",
    )

    YGMD = Game(
        owner_id=7,
        title="Yu-Gi-Oh! Master Duel",
        about="Yu-Gi-Oh! MASTER DUEL is the ultimate free-to-play cross-platform strategy card game with fast-paced Duels, stunning HD graphics and a new, dynamic soundtrack! Get ready to challenge Duelists around the world!",
        price=0.00,
        release_date=datetime(2022, 1, 18),
        developer="KONAMI",
        publisher="KONAMI",
        ESRB_rating="T",
        genre="Simulation,Strategy,Free To Play",
        images="YGMD.img",
    )

    MGSV = Game(
        owner_id=7,
        title="METAL GEAR SOLID V: THE PHANTOM PAIN",
        about="Ushering in a new era for the METAL GEAR franchise with cutting-edge technology powered by the Fox Engine, METAL GEAR SOLID V: The Phantom Pain, will provide players a first-rate gaming experience as they are offered tactical freedom to carry out open-world missions.",
        price=19.99,
        release_date=datetime(2015, 9, 1),
        developer="KONAMI",
        publisher="KONAMI",
        ESRB_rating="M",
        genre="Action,Adventure",
        images="MGSV.img",
    )

    Katamari = Game(
        owner_id=9,
        title="Katamari Damacy REROLL",
        about="The beloved roll-em-up game returns with fully updated graphics, completely recreated cutscenes and in full HD!",
        price=29.99,
        release_date=datetime(2018, 11, 6),
        developer="MONKEYCRAFT Co. Ltd.",
        publisher="BANDAI NAMCO Entertainment",
        ESRB_rating="E",
        genre="Action,Casual",
        images="Katamari.img",
    )


    db.session.add_all([MonterHunterWorld, ResidentEvil4, DragonsDogma2, DevilMayCry5, Persona5, Persona4, Persona3, HELLDIVERS2, GhostofTsushimaa, HorizonForbiddenWest, DarkSouls, DarkSouls2, DarkSouls3, EldenRing, ARMOREDCORE, Sekiro, MGR, YGMD, MGSV, Katamari])

    db.session.commit()


def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM game"))

    db.session.commit()
