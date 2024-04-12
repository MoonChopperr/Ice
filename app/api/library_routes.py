from flask import Blueprint, jsonify
from flask_login import login_required, current_user

from app.models import Game, ShoppingCart, db, Library

library_routes = Blueprint('library', __name__)

@library_routes.route('/')
@login_required
def library():
    """Returns user library"""
    library = Library.query.filter_by(user_id=current_user.id).all()
    game_ids = [item.game_id for item in library]
    games = Game.query.filter(Game.id.in_(game_ids)).all()
    return {"library": [game.to_dict() for game in games]}, 200

@library_routes.route('/checkout', methods=['POST'])
@login_required
def checkout():
    """Checkout user cart and add to library"""
    shopping_cart = ShoppingCart.query.filter_by(user_id=current_user.id).all()

    for item in shopping_cart:
        library_item = Library(user_id=current_user.id, game_id=item.game_id)
        db.session.add(library_item)

    ShoppingCart.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()

    return {"message": "Cart checked out successfully"}
