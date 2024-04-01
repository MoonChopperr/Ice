from flask import Blueprint, request, redirect, jsonify
from flask_login import login_required, current_user
from app.models import Game, ShoppingCart, db

cart_routes = Blueprint('cart',__name__)

@cart_routes.route('/current')
@login_required
def currOrders():
    """Returns current user's cart"""
    
