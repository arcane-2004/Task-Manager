"use client"
import { createTask } from '@/lib/api';
import { Task } from '@/types/task';
import { User } from '@/types/user';
import React, { useState, Dispatch, SetStateAction } from 'react'
import toast from "react-hot-toast";
import { LoaderCircle } from 'lucide-react';

interface CreateTaskFormProps {
    users: User[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    currentUser: User | null;
}

const CreateTaskForm = ({ users, setTasks, currentUser }: CreateTaskFormProps) => {



    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        if (!currentUser?.id) return;
        try {
            const res = await createTask({
                title,
                description,
                assigned_to: assignedTo,
                created_by: currentUser?.id,
            });

            // ✅ instant UI update (if parent manages tasks)
            if (setTasks) {
                setTasks((prev: Task[]) => [res, ...prev]);
            }

            if (res.status === "ok") {
                toast(res.message)
            }

            // reset form
            setTitle("");
            setDescription("");
            setAssignedTo("");
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    className={`rounded-lg px-5 py-2.5 font-medium text-white transition
                        ${loading
                            ? "bg-purple-300 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            Creating
                            <LoaderCircle className="animate-spin" />
                        </span>
                    ) : (
                        "Create Task"
                    )}
                </button>
            </form>
        </div>
    )
}

export default CreateTaskForm
