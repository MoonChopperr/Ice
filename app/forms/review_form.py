from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    game_id = IntegerField('Game ID', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired(), Length(max=2000)])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=-1, max=1)])
    submit = SubmitField('Submit')
