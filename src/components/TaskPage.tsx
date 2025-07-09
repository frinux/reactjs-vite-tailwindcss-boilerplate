import TaskInput from './TaskInput'
import TaskList from './TaskList'
import TaskFilter, { Filter } from './TaskFilter'
import { useTaskStore } from '../utils/useTaskStore'
import { useState, useEffect } from 'react'

export default function TaskPage() {
    const [filter, setFilter] = useState<Filter>('all')
    const tasks = useTaskStore((s) => s.tasks)
    const loading = useTaskStore((s) => s.loading)
    const error = useTaskStore((s) => s.error)
    const fetchTasks = useTaskStore((s) => s.fetchTasks)

    useEffect(() => {
        fetchTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredTasks =
        filter === 'all'
            ? tasks
            : filter === 'active'
                ? tasks.filter((t) => !t.completed)
                : tasks.filter((t) => t.completed)

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-[#122117] px-4 py-10">
            <div className="w-full max-w-md">
                <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Focus<span className="text-[#38E07A]">Flow</span>
                </h1>
                {error && (
                    <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
                        {error}
                    </div>
                )}
                <TaskInput loading={loading} />
                <TaskFilter
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    loading={loading}
                />
                {loading ? (
                    <div className="py-8 text-center text-lg font-medium text-[#96C4A8]">
                        Chargement…
                    </div>
                ) : (
                    <TaskList tasks={filteredTasks} />
                )}
            </div>
        </div>
    )
}
