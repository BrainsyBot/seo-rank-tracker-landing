'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { SubscriptionGate } from '@/components/SubscriptionGate'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

type Site = {
  id: string
  domain: string
  name: string | null
  created_at: string
}

export default function Dashboard() {
  const router = useRouter()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [user, setUser] = useState<any>(null)
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [newDomain, setNewDomain] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
    loadSites(user.id)
  }

  async function loadSites(userId: string) {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading sites:', error)
    } else {
      setSites(data || [])
    }
    setLoading(false)
  }

  async function addSite(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !newDomain) return

    const { data, error } = await supabase
      .from('sites')
      .insert([
        {
          user_id: user.id,
          domain: newDomain,
          name: newName || null
        }
      ])
      .select()

    if (error) {
      console.error('Error adding site:', error)
      alert('Error adding site: ' + error.message)
    } else {
      setNewDomain('')
      setNewName('')
      loadSites(user.id)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <SubscriptionGate>
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">SEO Rank Tracker</h1>
          <div className="flex items-center gap-4">
            {address && (
              <span className="text-sm text-gray-500">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            )}
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Site Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Website</h2>
          <form onSubmit={addSite} className="flex gap-4">
            <input
              type="text"
              placeholder="example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Name (optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Site
            </button>
          </form>
        </div>

        {/* Sites List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Websites</h2>
          </div>
          {sites.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No websites yet. Add your first website above.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sites.map((site) => (
                <li key={site.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {site.name || site.domain}
                      </h3>
                      <p className="text-sm text-gray-500">{site.domain}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/dashboard/site/${site.id}`)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Manage Keywords →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
    </SubscriptionGate>
  )
}
