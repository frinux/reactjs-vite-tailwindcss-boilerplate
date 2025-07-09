const API_URL = import.meta.env.VITE_API_URL || '/api'
export type Task = {
    id: string
    title: string
    done: boolean
}
async function handleResponse(res: Response): Promise<unknown> {
    const contentType = res.headers.get('content-type') || ''
    if (!res.ok) {
        let message = 'Erreur réseau'
        if (contentType.includes('application/json')) {
            try {
                const data: Record<string, unknown> = await res.json()
                message =
                    (typeof data.error === 'string' && data.error) ||
                    (typeof data.message === 'string' && data.message) ||
                    message
            } catch (e) {
                // ignore JSON parse error
            }
        } else {
            try {
                message = await res.text()
            } catch { }
        }
        throw new Error(message)
    }
    if (contentType.includes('application/json')) {
        const json = await res.json()
        if ('data' in json) return json.data
        return json
    }
    // Si pas de JSON (ex: 204 No Content), retourne null
    return null
}
export async function getTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/tasks`)
    return handleResponse(res) as Promise<Task[]>
}
export async function createTask(title: string): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    return handleResponse(res) as Promise<Task>
}
export async function updateTask(
    id: string,
    updates: Partial<Task> & { done?: boolean }
): Promise<Task> {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    })
    return handleResponse(res) as Promise<Task>
}
export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
    })
    return handleResponse(res) as Promise<void>
}
