'use client'
 
import { useState } from 'react'
import Link from 'next/link'
 
export default function GroupClient({ group, currentUser, isAdmin }) {
  const [members] = useState(group.members)
 
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
 
      {/* Cabecera del grupo */}
      <div className="border-b px-8 py-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm transition-colors"
              style={{ color: 'var(--muted)' }}
            >
              ← Dashboard
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{group.name}</h1>
              {group.description && (
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{group.description}</p>
              )}
            </div>
          </div>
 
          {/* Avatares de miembros */}
          <div className="flex items-center gap-1">
            {group.members.slice(0, 3).map(({ user }) => (
              <div
                key={user.id}
                title={user.name}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {group.members.length > 3 && (
              <span className="text-xs ml-1" style={{ color: 'var(--muted)' }}>
                +{group.members.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
 
      {/* Listado simple de miembros */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(({ id: membershipId, user, role }) => (
            <div
              key={user.id}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{user.name}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{user.email}</p>
                <span className="text-xs" style={{ color: 'var(--accent)' }}>
                  {role === 'admin' ? 'Administrador' : 'Miembro'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
 
    </div>
  )
}