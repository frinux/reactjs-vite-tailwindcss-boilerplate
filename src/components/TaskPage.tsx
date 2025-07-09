import TaskInput from './TaskInput'
import TaskList from './TaskList'

export default function TaskPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-[#122117] px-4 py-10">
            <div className="w-full max-w-md">
                <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Focus<span className="text-[#38E07A]">Flow</span>
                </h1>
                <TaskInput />
                <TaskList />
            </div>
        </div>
    )
}
