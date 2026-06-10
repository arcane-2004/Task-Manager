import uuid

from extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.UUID(as_uuid = True),
        primary_key = True,
        default=uuid.uuid4
    )
    
    name = db.Column(
        db.String(255),
        nullable=False
    )
    
    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )
    
    created_at = db.Column(
        db.DateTime,
        server_default = db.func.now()
    )
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email
        }

