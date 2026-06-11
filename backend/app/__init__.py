from flask import Flask
from config import Config
from extensions import db, migrate, mail
from app.models import User, Task
from app.routes.users import user_bp
from app.routes.hello import hello_bp
from app.routes.tasks import task_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)


    CORS(app, 
         origins=["http://localhost:3001"],
    )
 
    app.config.from_object(Config)

    db.init_app(app)     
    migrate.init_app(app, db)
    mail.init_app(app)

    app.register_blueprint(user_bp)
    app.register_blueprint(hello_bp)
    app.register_blueprint(task_bp)

    return app
