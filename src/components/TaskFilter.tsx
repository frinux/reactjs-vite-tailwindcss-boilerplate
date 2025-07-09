import { useTaskStore, TaskStore } from '../utils/useTaskStore'
import type { Task } from '../utils/apiService'
export type Filter = 'all' | 'active' | 'completed'
interface TaskFilterProps {
    currentFilter: Filter
    onFilterChange: (filter: Filter) => void
    loading?: boolean
}
export default function TaskFilter({
    currentFilter,
    onFilterChange,
    loading
}: TaskFilterProps) {
    const tasks = useTaskStore((state: TaskStore) => state.tasks)
    const clearCompleted = useTaskStore(
        (state: TaskStore) => state.clearCompleted
    )
    const activeCount = tasks.filter((task: Task) => !task.completed).length
    const completedCount = tasks.filter((task: Task) => task.completed).length
    return (
        <div className="mt-6 flex items-center justify-between rounded-lg border bg-white p-4">
            <span className="text-sm text-gray-600">
                {activeCount} tâche{activeCount > 1 ? 's' : ''} active
                {activeCount > 1 ? 's' : ''}
            </span>
            <div className="flex gap-2">
                {(['all', 'active', 'completed'] as Filter[]).map((filter) => (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`rounded px-3 py-1 text-sm transition-colors ${currentFilter === filter
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        disabled={loading}
                    >
                        {filter === 'all'
                            ? 'Toutes'
                            : filter === 'active'
                                ? 'Actives'
                                : 'Terminées'}
                    </button>
                ))}
            </div>
            {completedCount > 0 && (
                <button
                    onClick={async () => {
                        await clearCompleted()
                    }}
                    className="text-sm text-red-500 transition-colors hover:text-red-700"
                    disabled={loading}
                >
                    Effacer terminées
                </button>
            )}
        </div>
    )
}
