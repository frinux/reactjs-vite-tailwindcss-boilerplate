import { create } from 'zustand'
import type { Task } from './apiService'
import * as api from './apiService'
export type { Task } from './apiService'
export type TaskStore = {
    tasks: Task[]
    loading: boolean
    error: string | null
    fetchTasks: () => Promise<void>
    addTask: (title: string) => Promise<void>
    toggleTask: (id: string) => Promise<void>
    removeTask: (id: string) => Promise<void>
    clearCompleted: () => Promise<void>
}
export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
        set({ loading: true, error: null })
        try {
            let tasks = await api.getTasks()
            if (!Array.isArray(tasks)) tasks = []
            set({ tasks, loading: false })
        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
    addTask: async (title) => {
        set({ loading: true, error: null })
        try {
            const task = await api.createTask(title)
            set({ tasks: [...get().tasks, task], loading: false })
        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
    toggleTask: async (id) => {
        set({ loading: true, error: null })
        try {
            const task = get().tasks.find((t) => t.id === id)
            if (!task) throw new Error('Tâche introuvable')
            const updated = await api.updateTask(id, { done: !task.done })
            set({
                tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
                loading: false
            })
        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
    removeTask: async (id) => {
        set({ loading: true, error: null })
        try {
            await api.deleteTask(id)
            set({ tasks: get().tasks.filter((t) => t.id !== id), loading: false })
        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    },
    clearCompleted: async () => {
        set({ loading: true, error: null })
        try {
            const completed = get().tasks.filter((t) => t.done)
            await Promise.all(completed.map((t) => api.deleteTask(t.id)))
            set({ tasks: get().tasks.filter((t) => !t.done), loading: false })
        } catch (e) {
            set({ error: (e as Error).message, loading: false })
        }
    }
}))
