from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, widgets, DecimalField, DateField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import Game
from datetime import datetime

# AWS
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS


GENRES = [
    ('Action', 'Action'),
    ('Adventure', 'Adventure'),
    ('RPG', 'RPG'),
    ('Strategy', 'Strategy'),
    ('Simulation', 'Simulation'),
    ('Sports', 'Sports'),
    ('Racing', 'Racing'),
    ('Puzzle', 'Puzzle'),
    ('Fighting', 'Fighting'),
    ('Platformer', 'Platformer'),
    ('Sandbox', 'Sandbox'),
    ('Survival', 'Survival'),
    ('Horror', 'Horror'),
    ('Stealth', 'Stealth'),
    ('Battle Royale', 'Battle Royale'),
    ('Casual', 'Casual'),
    ('Simulation','Simulation'),
    ('Strategy','Strategy'),
    ('Free To Play','Free To Play'),
    ('Open World', 'Open World'),
    ('Metroidvania', 'Metroidvania'),
    ('Roguelike / Roguelite', 'Roguelike / Roguelite'),
    ('MMORPG', 'MMORPG'),
    ('MOBA', 'MOBA'),
    ('Rhythm / Music', 'Rhythm / Music'),
    ('Party / Mini-Games', 'Party / Mini-Games'),
    ('Visual Novel', 'Visual Novel'),
    ('Virtual Reality', 'Virtual Reality')
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
    price = DecimalField('Price')
    release_date = DateField('Release Date', validators=[DataRequired()])
    developer = StringField('Developer', validators=[DataRequired()])
    publisher = StringField('Publisher', validators=[DataRequired()])
    franchise = StringField('Franchise')
    ESRB_rating = StringField('ESRB Rating')
    genre = MultiCheckboxField('Genre', choices=GENRES, validators=[check_genre, DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # submit = SubmitField("Create Post")
