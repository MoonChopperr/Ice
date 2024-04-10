from flask import Blueprint, request, redirect, jsonify
from flask_login import login_required, current_user
from app.models import Wishlist, db, Game

wishlist_routes = Blueprint("wishlist", __name__)


@wishlist_routes.route("/current")
@login_required
def get_user_wishlist():
    """View user's wishlist"""
    wishlist_items = Wishlist.query.filter_by(user_id=current_user.id).all()
    return {"currentWishlist": [item.to_dict() for item in wishlist_items]}, 200


@wishlist_routes.route("/", methods=["POST"])
@login_required
def add_to_wishlist():
    """Add game to wishlist"""
    data = request.json
    game_id = data.get("game_id")
    new_wishlist_item = Wishlist(user_id=current_user.id, game_id=game_id, rank='')

    alr_exist_item = Wishlist.query.filter_by(user_id=current_user.id, game_id=game_id).first()
    if alr_exist_item:
        return {"message": "Game already in wishlist"},400

    game = Game.query.get(game_id)
    if not game:
        return {"message": "Game doesn't exist"}, 404

    if not new_wishlist_item:
        return {"message": "Can't add to wishlist"}, 400

    db.session.add(new_wishlist_item)
    db.session.commit()

    return jsonify(new_wishlist_item.to_dict()), 201


@wishlist_routes.route("/<int:wishlist_item_id>", methods=["PUT"])
@login_required
def update_wishlist_item(wishlist_item_id):
    """Update rank to wishlist item"""
    data = request.json

    wishlist_item = Wishlist.query.get(wishlist_item_id)

    if wishlist_item.user_id != current_user.id:
        return {"error": "You are not authorized to edit this wishlist"}, 403

    if wishlist_item:
        wishlist_item.rank = data['rank']
        db.session.commit()
        return jsonify(wishlist_item.to_dict())
    return jsonify({'message': 'Wishlist item not found'}), 404


@wishlist_routes.route("/<int:wishlist_item_id>", methods=["DELETE"])
@login_required
def delete_wishlist_item(wishlist_item_id):
    """Delete an item from wishlist"""
    wishlist_item = Wishlist.query.get(wishlist_item_id)
    if wishlist_item:
        db.session.delete(wishlist_item)
        db.session.commit()
        return jsonify({'message': 'Wishlist item deleted'})
    return jsonify({'message': 'Wishlist item not found'}), 404
