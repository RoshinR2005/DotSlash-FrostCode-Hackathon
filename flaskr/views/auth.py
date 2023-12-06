from flask import Flask, Blueprint

router = Blueprint('auth', __name__, '/auth')

@router.route('/')
def home():
    return "Auth home"
