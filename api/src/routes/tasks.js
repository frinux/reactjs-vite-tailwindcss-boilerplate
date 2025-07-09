import { Router } from 'express'
const router = Router()
let tasks = []
let nextId = 1
const findTaskIndex = (id) => tasks.findIndex((t) => t.id === id)

router.get('/', (req, res) => {
    try {
        res.json({ success: true, data: tasks, error: null })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, data: null, error: 'Erreur serveur.' })
    }
})

router.post('/', (req, res) => {
    try {
        const { title } = req.body
        if (!title || typeof title !== 'string' || !title.trim()) {
            return res
                .status(400)
                .json({ success: false, data: null, error: 'Le titre est requis.' })
        }
        const now = new Date()
        const newTask = {
            id: nextId++,
            title: title.trim(),
            done: false,
            createdAt: now,
            updatedAt: now
        }
        tasks.push(newTask)
        console.log('Toutes les tâches après ajout :', tasks)
        res.status(201).json({ success: true, data: newTask, error: null })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, data: null, error: 'Erreur serveur.' })
    }
})

router.put('/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, done } = req.body
        const idx = findTaskIndex(id)
        if (idx === -1) {
            return res
                .status(404)
                .json({ success: false, data: null, error: 'Tâche non trouvée.' })
        }
        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res
                    .status(400)
                    .json({ success: false, data: null, error: 'Le titre est requis.' })
            }
            tasks[idx].title = title.trim()
        }
        if (done !== undefined) {
            if (typeof done !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: 'Le statut done doit être un booléen.'
                })
            }
            tasks[idx].done = done
        }
        tasks[idx].updatedAt = new Date()
        console.log('Toutes les tâches après modification :', tasks)
        res.json({ success: true, data: tasks[idx], error: null })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, data: null, error: 'Erreur serveur.' })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const idx = findTaskIndex(id)
        if (idx === -1) {
            return res
                .status(404)
                .json({ success: false, data: null, error: 'Tâche non trouvée.' })
        }
        const removed = tasks.splice(idx, 1)[0]
        res.json({ success: true, data: removed, error: null })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, data: null, error: 'Erreur serveur.' })
    }
})

export default router
