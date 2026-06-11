import { Task } from "@/types/task";

interface TaskCardProps {
    task: Task;
    onComplete?: (id: string) => void;
    assignedToMe?: boolean
}



export default function TaskCard({ task, onComplete, assignedToMe=false }: TaskCardProps) {
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
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
            ${task.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
          `}
                    >
                        {task.status}
                    </span>

                    <div>
                        {
                            (task.status !== "completed" && assignedToMe) && (
                                <button
                                    onClick={() => onComplete?.(task.id)}
                                    className="mt-4 rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700 cursor-pointer"
                                >
                                    Mark Complete
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>


        </div>
    );
}