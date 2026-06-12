import { updateTaskStatus } from "@/lib/api";
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { useState, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface TaskCardProps {
    task: Task;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    currentUser?: User | null;
    assignedToName?: string
}


export default function TaskCard({ task, setTasks, currentUser, assignedToName }: TaskCardProps) {

    const [loadingStatus, setLoadingStatus] = useState(false);

    const statusOptions = ["pending", "in_progress", "completed"];
    const handleStatusChange = async (newStatus: string) => {
        if (task.status === "completed") return;

        setLoadingStatus(true);

        try {
            const res = await updateTaskStatus(task.id, newStatus);

            // ✅ instant UI update (NO reload)
            setTasks((prev: Task[]) =>
                prev.map((t) =>
                    t.id === task.id ? { ...t, status: newStatus } : t
                )
            );
            toast.success(res.message)
        } finally {

            setLoadingStatus(false);
        }
    };


    const canUpdateStatus =
        task.assigned_to === currentUser?.id && task.status !== "completed" && !loadingStatus;

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5 mb-2">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        {task.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                        {task.description}
                    </p>
                </div>

                <div>
                    {canUpdateStatus && (
                        <div className="flex gap-2 mt-2">
                            {statusOptions.map((status) => {
                                const isActive = task.status === status;

                                return (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                        disabled={isActive}
                                        className={`px-3 py-1 rounded-full text-xs border transition cursor-pointer
                                                ${isActive
                                                ? "bg-purple-600 text-white border-purple-600"
                                                : "bg-white text-gray-600 hover:bg-purple-50"
                                            }`}
                                    >
                                        {status.replace("_", " ")}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {!canUpdateStatus && (
                        <span
                            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                                    ${task.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {task.status}
                        </span>
                    )}

                    {loadingStatus && (
                        <p className="text-xs text-gray-400 mt-1">
                            Updating status...
                        </p>
                    )}
                </div>
            </div>


        </div>
    );
}