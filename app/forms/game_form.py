from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, widgets, DecimalField, DateField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Game
from datetime import datetime

# AWS
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS


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

def check_genre(form, field):
    selected_genres = set(field.data)
    valid_genres = set([genre[0] for genre in GENRES])
    invalid_genres = selected_genres - valid_genres
    if invalid_genres:
        valid_genre_list = ', '.join(valid_genres)
        raise ValidationError(f"Invalid genre, here is a list of valid genres to pick from! {valid_genre_list}")

# def validate_genre(form, field):
#         field.data = ','.join(field.data)

class CreateGame(FlaskForm):
    title = StringField('Title', validators =[DataRequired()])
    about = StringField('About', validators =[DataRequired()])
    price = DecimalField('Price', validators =[DataRequired()])
    release_date = DateField('Release Date', validators=[DataRequired()])
    developer = StringField('Developer', validators=[DataRequired()])
    publisher = StringField('Publisher', validators=[DataRequired()])
    franchise = StringField('Franchise')
    ESRB_rating = StringField('ESRB Rating')
    genre = MultiCheckboxField('Genre', choices=GENRES, validators=[check_genre, DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # submit = SubmitField("Create Post")
