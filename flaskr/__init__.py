from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    from .views import public, auth

    app.register_blueprint(public.router)
    app.register_blueprint(auth.router, url_prefix='/auth')
     

    return app
