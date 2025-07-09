import TaskInput from './TaskInput'
import TaskList from './TaskList'
import TaskFilter, { Filter } from './TaskFilter'
import { useTaskStore } from '../utils/useTaskStore'
import { useState } from 'react'

export default function TaskPage() {
    const [filter, setFilter] = useState<Filter>('all')
    const tasks = useTaskStore((s) => s.tasks)

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
                <TaskInput />
                <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                <TaskList tasks={filteredTasks} />
            </div>
        </div>
    )
}
