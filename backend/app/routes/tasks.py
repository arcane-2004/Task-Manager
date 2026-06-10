from flask import Blueprint, request, jsonify
from extensions import db
from app.models import Task

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

    return jsonify({
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
    
    return jsonify({
        "message": "Task completed successfully"
    }), 200