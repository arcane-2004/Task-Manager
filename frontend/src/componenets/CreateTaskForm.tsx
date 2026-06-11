"use client"
import { createTask } from '@/lib/api';
import { User } from '@/types/user';
import React, { useState } from 'react'
import toast from "react-hot-toast";

interface CreateTaskFormProps {
    users: User[];
    currentUser: User | null;
}

const CreateTaskForm = ({ users, currentUser }: CreateTaskFormProps) => {



    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log(currentUser)
        if (!currentUser) return;

        const taskData = {
            title,
            description,
            assigned_to: assignedTo,
            created_by: currentUser.id,
        };

        const res = await createTask(taskData);
        console.log("res", res.status)

        if(res.status == "ok"){
            toast.success(res.message)
        }

        setTitle("")
        setDescription("")
        setAssignedTo("")
    };

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Create Task
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-purple-600"
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Describe the task..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-purple-600"
                    />
                </div>

                {/* Assign User */}
                <div>
                    <label
                        htmlFor="assignedTo"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Assign To
                    </label>

                    <select
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-purple-600"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700 cursor-pointer"

                >
                    Create Task
                </button>
            </form>
        </div>
    )
}

export default CreateTaskForm
