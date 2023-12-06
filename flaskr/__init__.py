import os, firebase_admin
from flask import Flask
from firebase_admin import credentials

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    cred = credentials.Certificate(os.path.join(app.root_path, 'key.json'))
    firebase_admin.initialize_app(cred)
    
    from .views import public, auth

    app.register_blueprint(public.router)
    app.register_blueprint(auth.router, url_prefix='/auth')
     

    return app
