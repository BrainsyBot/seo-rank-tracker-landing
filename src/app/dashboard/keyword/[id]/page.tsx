'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

type Keyword = {
  id: string
  keyword: string
  site_id: string
}

type RankCheck = {
  id: string
  rank: number | null
  checked_at: string
}

type Site = {
  domain: string
  name: string | null
}

export default function KeywordPage() {
  const router = useRouter()
  const params = useParams()
  const keywordId = params.id as string

  const [keyword, setKeyword] = useState<Keyword | null>(null)
  const [site, setSite] = useState<Site | null>(null)
  const [checks, setChecks] = useState<RankCheck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [keywordId])

  async function loadData() {
    // Load keyword
    const { data: kwData, error: kwError } = await supabase
      .from('keywords')
      .select('*')
      .eq('id', keywordId)
      .single()

    if (kwError || !kwData) {
      console.error('Error loading keyword:', kwError)
      router.push('/dashboard')
      return
    }

    setKeyword(kwData)

    // Load site
    const { data: siteData } = await supabase
      .from('sites')
      .select('domain, name')
      .eq('id', kwData.site_id)
      .single()

    if (siteData) {
      setSite(siteData)
    }

    // Load rank checks
    const { data: checksData, error: checksError } = await supabase
      .from('rank_checks')
      .select('*')
      .eq('keyword_id', keywordId)
      .order('checked_at', { ascending: false })
      .limit(30)

    if (checksError) {
      console.error('Error loading checks:', checksError)
    } else {
      setChecks(checksData || [])
    }

    setLoading(false)
  }

  function getRankChange(): { change: number | null; direction: 'up' | 'down' | 'same' | 'new' } {
    if (checks.length < 2) return { change: null, direction: 'new' }
    
    const latest = checks[0]?.rank
    const previous = checks[1]?.rank

    if (latest === null || previous === null) return { change: null, direction: 'new' }
    
    const change = previous - latest // Positive = improved (moved up)
    
    if (change > 0) return { change, direction: 'up' }
    if (change < 0) return { change: Math.abs(change), direction: 'down' }
    return { change: 0, direction: 'same' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!keyword || !site) return null

  const latestRank = checks[0]?.rank
  const rankChange = getRankChange()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/dashboard/site/${keyword.site_id}`)}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                "{keyword.keyword}"
              </h1>
              <p className="text-sm text-gray-500">{site.name || site.domain}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Rank Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Rank</p>
              <p className="text-4xl font-bold text-gray-900">
                {latestRank ? `#${latestRank}` : 'Not Ranked'}
              </p>
            </div>
            {rankChange.direction !== 'new' && rankChange.change !== null && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                rankChange.direction === 'up' ? 'bg-green-100 text-green-700' :
                rankChange.direction === 'down' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {rankChange.direction === 'up' && '↑'}
                {rankChange.direction === 'down' && '↓'}
                {rankChange.direction === 'same' && '→'}
                <span className="font-semibold">
                  {rankChange.direction === 'same' ? 'No change' : `${rankChange.change} positions`}
                </span>
              </div>
            )}
          </div>
          {checks.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Last checked: {new Date(checks[0].checked_at).toLocaleString()}
            </p>
          )}
        </div>

        {/* Rank History */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Rank History (Last 30 Checks)</h2>
          </div>
          {checks.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No ranking data yet. Check rankings from the site page.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {checks.map((check, index) => {
                    const prevCheck = checks[index + 1]
                    let change = null
                    if (prevCheck && check.rank && prevCheck.rank) {
                      change = prevCheck.rank - check.rank
                    }

                    return (
                      <tr key={check.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(check.checked_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {check.rank ? `#${check.rank}` : 'Not found'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {change === null ? (
                            <span className="text-gray-400">-</span>
                          ) : change > 0 ? (
                            <span className="text-green-600">↑ {change}</span>
                          ) : change < 0 ? (
                            <span className="text-red-600">↓ {Math.abs(change)}</span>
                          ) : (
                            <span className="text-gray-600">→ 0</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
