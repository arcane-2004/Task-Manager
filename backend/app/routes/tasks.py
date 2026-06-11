from flask import Blueprint, request, jsonify
from extensions import db
from app.models import Task
from app.utils.email import send_email
from app.models import User

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    
    task = Task(
        title=data["title"],
        description=data.get("description"),
        created_by=data["created_by"],
        assigned_to=data["assigned_to"]
    )
    
    db.session.add(task)
    db.session.commit()

    assigned_user = User.query.get(task.assigned_to)

    if assigned_user:
        send_email(
            to=assigned_user.email,
            subject="New Task Assigned",
            body = f"""
            Hello {assigned_user.name},

            A new task has been assigned to you.

            Title: {task.title}

            Description:
            {task.description}

            Please login to Task Manager to view details.

            Regards,
            Task Manager
            """
        )
    
    return jsonify({
        "status": "ok",
        "message": "Task created successfully"
    }), 201


@task_bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()

    result = []

    for task in tasks:
        result.append({
            "id": str(task.id),
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "created_by": str(task.created_by),
            "assigned_to": str(task.assigned_to),
            "created_at": task.created_at
        })

    return jsonify(result), 200


@task_bp.route("/tasks/<task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    task = db.session.get(Task, task_id)

    if not task:
        return jsonify({
            "error": "Task not found"
        }), 404
    
    task.status = "completed"
    
    db.session.commit()
    
    createdBy_user = User.query.get(task.created_by)

    if createdBy_user:
        send_email(
            to=createdBy_user.email,
            subject="Task Completed",
            body = f"""
            Hello {createdBy_user.name},

            Task assigned by you to has been marked completed.

            Title: {task.title}

            Description:
            {task.description}

            Please login to Task Manager to view details.

            Regards,
            Task Manager
            """
        )
        
    return jsonify({
        "status" : "ok",
        "message": "Task completed successfully"
    }), 200
    

@task_bp.route("/test-email")
def test_email():

    send_email(
        "ghostsumit153@gmail.com",
        "Task Manager Test",
        "Email is working"
    )

    return {
        "message": "sent"
    }


@task_bp.route("/debug-mail")
def debug_mail():
    from flask import current_app

    return {
        "username": current_app.config["MAIL_USERNAME"],
        "password_exists": bool(current_app.config["MAIL_PASSWORD"]),
        "server": current_app.config["MAIL_SERVER"],
        "port": current_app.config["MAIL_PORT"],
        "tls": current_app.config["MAIL_USE_TLS"],
    }