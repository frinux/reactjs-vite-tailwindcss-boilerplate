import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Task = {
    id: string
    title: string
    completed: boolean
}

type TaskStore = {
    tasks: Task[]
    addTask: (title: string) => void
    toggleTask: (id: string) => void
    removeTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (title) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { id: Date.now().toString(), title, completed: false }
                    ]
                })),
            toggleTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, completed: !task.completed } : task
                    )
                })),
            removeTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id)
                }))
        }),
        {
            name: 'focusflow-tasks' // clé localStorage
        }
    )
)
