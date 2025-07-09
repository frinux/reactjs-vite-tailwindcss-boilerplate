import { useState } from 'react'
import { useTaskStore } from '../utils/useTaskStore'

export default function TaskInput() {
    const [value, setValue] = useState('')
    const addTask = useTaskStore((s) => s.addTask)

    const handleAdd = () => {
        if (value.trim()) {
            addTask(value.trim())
            setValue('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAdd()
    }

    return (
        <div className="flex items-center gap-2 rounded-2xl bg-[#122117] px-4 py-3">
            <input
                className="flex-1 bg-transparent text-base font-medium text-white placeholder-[#96C4A8] outline-none"
                type="text"
                placeholder="Ajouter une tâche..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Ajouter une tâche"
            />
            <button
                className="rounded-xl bg-[#38E07A] px-4 py-2 font-bold text-[#122117] transition hover:bg-[#2fc96a] disabled:opacity-50"
                onClick={handleAdd}
                disabled={!value.trim()}
            >
                Ajouter
            </button>
        </div>
    )
}
