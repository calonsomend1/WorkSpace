'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewGroupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    // Redirige al espacio del grupo recién creado
    router.push(`/group/${data.id}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Nuevo grupo</h1>
        <p className="text-gray-400 mb-8">Crea un espacio de trabajo para tu equipo</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Nombre del grupo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Equipo de diseño"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Descripción (opcional)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="¿De qué trata este grupo?"
              rows={3}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 mt-2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear grupo'}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300">
            ← Volver al dashboard
          </Link>
        </p>
      </div>
    </main>
  )
}