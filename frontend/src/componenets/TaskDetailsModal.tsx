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
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-10 z-50 w-full max-w-2xl -translate-x-1/2">
                <div className="mx-4 rounded-2xl bg-white p-6 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {task.title}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-xl text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div>
                            <p className="font-medium">Description</p>
                            <p className="text-gray-600">
                                {task.description}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">Status</p>
                            <p>{task.status}</p>
                        </div>

                        <div>
                            <p className="font-medium">Created By</p>
                            <p>{createdByName}</p>
                        </div>

                        <div>
                            <p className="font-medium">Assigned To</p>
                            <p>{assignedToName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}