// components/TaskDetailsModal.tsx

"use client";

import { Task } from "@/types/task";
import { User } from "@/types/user";

interface TaskDetailsModalProps {
    task: Task | null;
    isOpen: boolean;
    users: User[]
    onClose: () => void;
}

export default function TaskDetailsModal({
    task,
    isOpen,
    onClose,
    users
}: TaskDetailsModalProps) {
    if (!isOpen || !task) return null;

    const createdByName =
        users.find((u) => u.id === task.created_by)?.name ||
        "Unknown User";

    const assignedToName =
        users.find((u) => u.id === task.assigned_to)?.name ||
        "Unassigned";

    return (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 backdrop-blur-md p-4 pt-10">
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="border-b px-8 py-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {task.title}
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Task Details
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 p-8">

                    {/* Status */}
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Status
                        </h3>

                        <span
                            className={`inline-flex rounded-full px-4 py-2 text-sm font-medium
          ${task.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : task.status === "In Progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Description
                        </h3>

                        <div className="rounded-xl border bg-gray-50 p-4">
                            <p className="leading-relaxed text-gray-700">
                                {task.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    {/* Users */}
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-xl border p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Created By
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700">
                                    {createdByName.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900">
                                        {createdByName}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Assigned To
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                    {assignedToName.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900">
                                        {assignedToName}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Metadata */}
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Task ID
                            </p>

                            <p className="mt-1 truncate text-sm text-gray-700">
                                {task.id}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Current Status
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                                {task.status}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}