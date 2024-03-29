from flask import Blueprint, request, redirect, jsonify
from flask_login import login_required, current_user

from app.models import Game, ShoppingCart, db
from app.forms.game_form import CreateGame
from .aws_helper import upload_file_to_s3, get_unique_filename

game_routes = Blueprint('game', __name__)

@game_routes.route('/')
def games():
    """Returns a list of all games"""
    games = Game.query.all()
    return {'games':[game.to_dict() for game in games]},200


@game_routes.route('/<int:id>')
def game(id):
    """Returns a game specified by id"""
    game = Game.query.get(id)
    if not game:
        return{"message": "Game cannot be found"},404
    return game.to_dict(),200


@game_routes.route('/create', methods=['POST'])
@login_required
def post_game():
    """Create a new game"""
    form = CreateGame()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.image.data
        genres_str = ','.join(form.genre.data)
        url=None

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"game_image": "Failed to upload image, try again later."},500
            url=upload["url"]

        new_game = Game(
            owner_id=current_user.id,
            title=form.title.data,
            about=form.about.data,
            price=form.price.data,
            release_date=form.release_date.data,
            developer=form.developer.data,
            publisher=form.publisher.data,
            franchise=form.franchise.data,
            ESRB_rating=form.ESRB_rating.data,
            genre=genres_str,
            images=url
        )

        db.session.add(new_game)
        db.session.commit()

        return jsonify(new_game.to_dict()), 201
    return jsonify({'error': form.errors}),400


@game_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_game(id):
    """Update an existing game"""
    form = CreateGame()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        game = Game.query.get(id)
        image = form.image.data
        url = None

        if not game:
            return{"error": "Game could not be found"}, 404

        if game.owner_id != current_user.id:
            return {"error": "You are not authorized to edit this game"}, 403

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"game_image": "Failed to upload image, try again later."}, 500
            url = upload["url"]
        genres_str = ','.join(form.genre.data)

        game.title = form.title.data
        game.about = form.about.data
        game.price = form.price.data
        game.release_date = form.release_date.data
        game.developer = form.developer.data
        game.publisher = form.publisher.data
        game.franchise = form.franchise.data
        game.ESRB_rating = form.ESRB_rating.data
        game.genre = genres_str
        game.images = url

        db.session.commit()

        return jsonify(game.to_dict()), 200
    return jsonify({'error': form.errors}),400


@game_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_game(id):
    """Delete a game by id"""
    game = Game.query.get(id)

    if not game:
        return {'error': "Game could not be found"}, 404

    if game.owner_id != current_user.id:
            return {"error": "You are not authorized to delete this game"}, 403

    db.session.delete(game)
    db.session.commit()

    return jsonify({"message": "Successfully deleted game"}), 200
