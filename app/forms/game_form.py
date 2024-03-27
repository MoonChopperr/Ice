from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, widgets, DecimalField, DateField
from wtforms.validators import DataRequired, Length
from app.models import Game

GENRES = [
    ('action', 'Action'),
    ('adventure', 'Adventure'),
    ('rpg', 'RPG'),
    ('strategy', 'Strategy'),
    ('simulation', 'Simulation'),
    ('sports', 'Sports'),
    ('racing', 'Racing'),
    ('puzzle', 'Puzzle'),
    ('fighting', 'Fighting'),
    ('platformer', 'Platformer'),
    ('sandbox', 'Sandbox'),
    ('survival', 'Survival'),
    ('horror', 'Horror'),
    ('stealth', 'Stealth'),
    ('battle_royale', 'Battle Royale'),
    ('casual', 'Casual'),
    ('simulation','Simulation'),
    ('strategy','Strategy'),
    ('simulation','Simulation'),
    ('free_to_play','Free To Play'),
    ('open_world', 'Open World'),
    ('metroidvania', 'Metroidvania'),
    ('roguelike_roguelite', 'Roguelike / Roguelite'),
    ('mmorpg', 'MMORPG'),
    ('moba', 'MOBA'),
    ('rhythm_music', 'Rhythm / Music'),
    ('party_mini_games', 'Party / Mini-Games'),
    ('visual_novel', 'Visual Novel'),
    ('virtual_reality', 'VR')
]
class MultiCheckboxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()

class CreateGame(FlaskForm):
    title = StringField('Title', validators =[DataRequired()])
    about = StringField('About', validators =[DataRequired()])
    price = DecimalField('Price', validators =[DataRequired()])
    release_date = DateField('Release Date', validators=[DataRequired()])
    developer = StringField('Developer', validators=[DataRequired()])
    publisher = StringField('Publisher', validators=[DataRequired()])
    franchise = StringField('Franchise')
    ESRB_rating = StringField('ESRB Rating', )
    genre = MultiCheckboxField('Genre', choices=GENRES)
    images = StringField('Images')
