from flask import Flask, Blueprint

router = Blueprint('public', __name__, '/')

@router.route("/")
def home():
    return "Home Page"
