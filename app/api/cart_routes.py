from flask import Blueprint, request, redirect, jsonify
from flask_login import login_required, current_user
from app.models import ShoppingCart, db

cart_routes = Blueprint("cart", __name__)


@cart_routes.route("/current")
@login_required
def currOrders():
    """Returns current user's cart"""
    cart = ShoppingCart.query.filter_by(user_id=current_user.id).all()

    # if cart<=0:
    #     return {"message": "Cart is empty"}

    if not cart:
        return {"message": "Cart couldn't be found or is empty"}, 404
    return {"currentCart": [items.to_dict() for items in cart]}, 200


@cart_routes.route("/create", methods=["POST"])
@login_required
def add_to_cart():
    """Add game to cart"""
    # convert to python dict
    data = request.json
    # quantity = data.get("quantity")
    game_id = data.get("game_id")
    add_cart = ShoppingCart(user_id=current_user.id, game_id=game_id, quantity=1)

    if not add_cart:
        return {"message": "Can't add to cart"}, 400

    db.session.add(add_cart)
    db.session.commit()

    return jsonify(add_cart.to_dict()), 201


@cart_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_cart(id):
    """Update an item in cart"""
    data = request.json
    updateQuantity = data.get("quantity")
    cart_item = ShoppingCart.query.get(id)

    print('cartitem=>',cart_item)
    if not cart_item:
        return {"message": "Cart item not found"}, 404

    if cart_item.user_id != current_user.id:
        return {"error": "You are not authorized to edit this cart"}, 403

    cart_item.quantity = updateQuantity
    db.session.commit()

    return jsonify(cart_item.to_dict()), 200


@cart_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_cart(id):
    """Delete an item in cart"""
    cart_item = ShoppingCart.query.get(id)

    if not cart_item:
        return {"message": "Cart item not found"}, 404

    if cart_item.user_id != current_user.id:
        return {"error": "You are not authorized to edit this cart"}, 403

    db.session.delete(cart_item)
    db.session.commit()

    return {"message": "Cart item deleted successfully"}, 200


@cart_routes.route("/clear", methods=["DELETE"])
@login_required
def clear_cart():
    all_items = ShoppingCart.query.filter_by(user_id=current_user.id).all()

    if not all_items:
        return {"message": "Nothing in cart"}
    for item in all_items:
        db.session.delete(item)
    db.session.commit()

    return {"message": "Cart cleared"}, 200
