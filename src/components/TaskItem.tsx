import { useTaskStore } from '../utils/useTaskStore'
import type { Task } from '../utils/apiService'

interface TaskItemProps {
    task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
    const toggleTask = useTaskStore((s) => s.toggleTask)
    const removeTask = useTaskStore((s) => s.removeTask)
    const loading = useTaskStore((s) => s.loading)
    return (
        <div className="mb-2 flex items-center justify-between gap-2 rounded-xl bg-[#122117] px-4 py-3">
            <label className="flex flex-1 cursor-pointer items-center gap-3">
                <span className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={async () => {
                            if (!loading) await toggleTask(task.id)
                        }}
                        className="peer size-5 appearance-none rounded-md border-2 border-[#38E07A] bg-transparent transition checked:border-[#38E07A] checked:bg-[#38E07A] focus:ring-2 focus:ring-[#38E07A]"
                        disabled={loading}
                    />
                    <svg
                        className="pointer-events-none absolute left-0 top-0 size-5 text-[#122117] opacity-0 peer-checked:opacity-100"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M5 10.5L9 14.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span
                    className={`line-clamp-1 text-base font-medium text-white transition ${task.done ? 'text-[#96C4A8] line-through' : ''
                        }`}
                >
                    {task.title}
                </span>
            </label>
            <button
                className="ml-2 rounded p-1 text-[#96C4A8] transition hover:bg-[#264533]"
                onClick={async () => {
                    if (!loading) await removeTask(task.id)
                }}
                aria-label="Supprimer la tâche"
                title="Supprimer"
                disabled={loading}
            >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M6 6L14 14M14 6L6 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    )
}
