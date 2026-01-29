'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

type Site = {
  id: string
  domain: string
  name: string | null
}

type Keyword = {
  id: string
  keyword: string
  created_at: string
}

type RankCheck = {
  rank: number | null
  checked_at: string
}

export default function SitePage() {
  const router = useRouter()
  const params = useParams()
  const siteId = params.id as string

  const [site, setSite] = useState<Site | null>(null)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [loading, setLoading] = useState(true)
  const [newKeyword, setNewKeyword] = useState('')
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    loadSite()
    loadKeywords()
  }, [siteId])

  async function loadSite() {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('id', siteId)
      .single()

    if (error) {
      console.error('Error loading site:', error)
      router.push('/dashboard')
    } else {
      setSite(data)
    }
  }

  async function loadKeywords() {
    const { data, error } = await supabase
      .from('keywords')
      .select('*')
      .eq('site_id', siteId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading keywords:', error)
    } else {
      setKeywords(data || [])
    }
    setLoading(false)
  }

  async function addKeyword(e: React.FormEvent) {
    e.preventDefault()
    if (!newKeyword.trim()) return

    const { data, error } = await supabase
      .from('keywords')
      .insert([
        {
          site_id: siteId,
          keyword: newKeyword.trim()
        }
      ])
      .select()

    if (error) {
      console.error('Error adding keyword:', error)
      alert('Error adding keyword: ' + error.message)
    } else {
      setNewKeyword('')
      loadKeywords()
    }
  }

  async function checkRankings() {
    if (!site) return
    setChecking(true)

    try {
      const response = await fetch('/api/check-rankings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId, domain: site.domain })
      })

      const result = await response.json()
      if (result.success) {
        alert('Rankings checked successfully!')
        loadKeywords()
      } else {
        alert('Error checking rankings: ' + result.error)
      }
    } catch (error) {
      console.error('Error checking rankings:', error)
      alert('Error checking rankings')
    } finally {
      setChecking(false)
    }
  }

  async function deleteKeyword(keywordId: string) {
    if (!confirm('Delete this keyword?')) return

    const { error } = await supabase
      .from('keywords')
      .delete()
      .eq('id', keywordId)

    if (error) {
      console.error('Error deleting keyword:', error)
      alert('Error deleting keyword')
    } else {
      loadKeywords()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!site) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {site.name || site.domain}
              </h1>
              <p className="text-sm text-gray-500">{site.domain}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Keyword Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Track Keywords</h2>
            <button
              onClick={checkRankings}
              disabled={checking || keywords.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checking ? 'Checking...' : 'Check All Rankings'}
            </button>
          </div>
          <form onSubmit={addKeyword} className="flex gap-4">
            <input
              type="text"
              placeholder="e.g., best react framework"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Keyword
            </button>
          </form>
        </div>

        {/* Keywords List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Keywords ({keywords.length})</h2>
          </div>
          {keywords.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No keywords yet. Add your first keyword above.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {keywords.map((keyword) => (
                <li key={keyword.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {keyword.keyword}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Added {new Date(keyword.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => router.push(`/dashboard/keyword/${keyword.id}`)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View History →
                      </button>
                      <button
                        onClick={() => deleteKeyword(keyword.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
