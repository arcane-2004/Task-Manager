import uuid

from extensions import db

class Task(db.Model):
    __tablename__ = "tasks"
    
    id = db.Column(
        db.UUID(as_uuid=True),
        primary_key = True,
        default = uuid.uuid4
    )
    
    title = db.Column(
        db.String(255),
        nullable=False
    )
    
    description = db.Column(
        db.Text,
        nullable=True
    )
    
    status = db.Column(
        db.String(50),
        nullable=False,
        default="pending"
    )
    
    created_by = db.Column(
        db.UUID(as_uuid=True),
        db.ForeignKey("users.id"),
        nullable=False
    )
    
    assigned_to = db.Column(
        db.UUID(as_uuid=True),
        db.ForeignKey("users.id"),
        nullable=False
    )
    
    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )
    