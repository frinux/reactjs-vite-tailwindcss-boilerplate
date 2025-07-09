import { Task } from '../utils/useTaskStore'
import TaskItem from './TaskItem'

interface TaskListProps {
    tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="py-8 text-center text-lg font-medium text-[#96C4A8]">
                Aucune tâche pour le moment.
            </div>
        )
    }

    return (
        <div className="mt-4 flex flex-col gap-1">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}
