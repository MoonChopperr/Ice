from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, Game, db
from app.forms import ReviewForm

review_routes = Blueprint("review", __name__)

@review_routes.route('/game/<int:game_id>')
def game_reviews(game_id):
    """Returns all reviews for specific game"""
    reviews = Review.query.filter_by(game_id=game_id).all()

    if not reviews:
        return jsonify({'message': 'No reviews'})

    if reviews:
        return jsonify([review.to_dict() for review in reviews]), 200


@review_routes.route('/user/<int:user_id>')
def user_reviews(user_id):
    """Returns all reviews for specific user"""
    reviews = Review.query.filter_by(user_id=user_id).all()

    if not reviews:
        return jsonify({'message': 'No reviews'})

    if reviews:
        return jsonify(reviews=[review.to_dict() for review in reviews]),200


@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    """Create a review"""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        game_id = form.game_id.data
        game = Game.query.get(game_id)

        if not game:
            return jsonify({'error': 'Game not found'}), 404

        if game.owner_id == current_user.id:
            return jsonify({'error': 'You cannot review your own game'}), 403

        existing_review = Review.query.filter_by(user_id=current_user.id, game_id=game_id).first()
        if existing_review:
            return jsonify({'error': 'You have already reviewed this game, update your existing review'}), 403

        new_review = Review(
            user_id=current_user.id,
            game_id=game_id,
            review=form.review.data,
            rating=form.rating.data,
            helpful=0,
            funny=0
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()),201
    return jsonify({'error': form.errors}),400

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """Edit a review"""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():
        review = Review.query.get(review_id)
        review.review = form.review.data
        review.rating = form.rating.data

        if not review:
            return{"error": "Review could not be found"}, 404

        if review.user_id != current_user.id:
            return {"error": "You are not authorized to edit this review"}, 403

        db.session.commit()
        return jsonify(review.to_dict()), 200
    return jsonify({'error': form.errors}), 400

@review_routes.route('/<int:review_id>', methods=["DELETE"])
@login_required
def delete_review(review_id):
    """Delete a review"""
    review = Review.query.get(review_id)


    if not review:
        return {'error': "Review could not be found"}, 404

    if review.user_id != current_user.id:
            return {"error": "You are not authorized to delete this review"}, 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Successfully deleted review"}), 200

@review_routes.route('/<int:id>/helpful', methods=["POST"])
@login_required
def increment_helpful(id):
    """Increment helpful attribute of review"""
    review = Review.query.get(id)

    if not review:
        return {'error': "Review could not be found"},404

    if review.user_id == current_user.id:
        return {'error': "You cannot rate your own review"},403

    review.helpful +=1
    db.session.commit()

    return jsonify({'helpful': review.helpful}),200

@review_routes.route('/<int:id>/helpful', methods=["DELETE"])
@login_required
def decrement_helpful(id):
    """Decrement helpful attribute of review"""
    review = Review.query.get(id)

    if not review:
        return {'error': "Review could not be found"},404

    if review.user_id == current_user.id:
        return {'error': "You cannot rate your own review"},403

    if review.helpful > 0:
        review.helpful -= 1
        db.session.commit()

    return jsonify({'helpful': review.helpful}),200

@review_routes.route('/<int:id>/funny', methods=['POST'])
@login_required
def increment_funny(id):
    """Increment funny attribute of a review"""
    review = Review.query.get(id)

    if not review:
        return {'error': "Review could not be found"}, 404

    if review.user_id == current_user.id:
        return {'error': "You cannot rate your own review"}, 403

    review.funny += 1
    db.session.commit()

    return jsonify({'funny': review.funny}), 200

@review_routes.route('/<int:id>/funny', methods=['DELETE'])
@login_required
def decrement_funny(id):
    """Decrement funny attribute of a review"""
    review = Review.query.get(id)

    if not review:
        return {'error': "Review could not be found"}, 404

    if review.user_id == current_user.id:
        return {'error': "You cannot rate your own review"}, 403

    if review.funny > 0:
        review.funny -= 1
        db.session.commit()

    return jsonify({'funny': review.funny}), 200
