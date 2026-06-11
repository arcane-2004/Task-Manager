from flask import Blueprint, request, jsonify

from extensions import db
from app.models import User

user_bp = Blueprint("users", __name__)


@user_bp.route("/users", methods=["POST", "OPTIONS"])
def create_user():
    data = request.get_json()

    user = User(name=data["name"], email=data["email"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully", }), 201


@user_bp.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()

    return jsonify([user.to_dict() for user in users]), 200


@user_bp.route("/users/sync", methods=["POST", "OPTIONS"])
def sync_user():
    data = request.get_json()
    
    user = User.query.filter_by(email=data["email"]).first()
    
    if user:
        return jsonify({
            "id": str(user.id),
            "email": user.email,
            "name": user.name
        }), 200

    user = User(
        name=data["name"],
        email=data["email"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": str(user.id),
        "email": user.email,
        "name": user.name
    }), 201