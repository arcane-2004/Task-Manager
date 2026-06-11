from flask import Blueprint, request, jsonify
from extensions import db
from app.models import Task
from app.utils.email import send_email
from app.models import User

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/tasks", methods=["POST", "OPTIONS"])
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


@task_bp.route("/tasks", methods=["GET", "OPTIONS"])
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



@task_bp.route("/tasks/<task_id>/status", methods=["PATCH", "OPTIONS"])
def update_status(task_id):
    data = request.json

    task = Task.query.get(task_id)

    if not task:
        return {"error": "Task not found"}, 404

    old_status = task.status
    task.status = data["status"]

    db.session.commit()

    # 🔥 EMAIL ONLY WHEN COMPLETED
    if data["status"] == "completed" and old_status != "completed":
        creator = User.query.get(task.created_by)

        if creator:
            send_email(
                to=creator.email,
                subject="Task Completed",
                body = f"""
                Hello {creator.name},

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
        "message": "status updated"
    }), 200
