import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  try {
    const { siteId, domain } = await request.json()

    if (!siteId || !domain) {
      return NextResponse.json(
        { success: false, error: 'Missing siteId or domain' },
        { status: 400 }
      )
    }

    // Get all keywords for this site
    const { data: keywords, error: keywordsError } = await supabase
      .from('keywords')
      .select('id, keyword')
      .eq('site_id', siteId)

    if (keywordsError) {
      return NextResponse.json(
        { success: false, error: keywordsError.message },
        { status: 500 }
      )
    }

    if (!keywords || keywords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No keywords found for this site' },
        { status: 404 }
      )
    }

    // Check each keyword's rank
    const braveApiKey = process.env.BRAVE_SEARCH_API_KEY
    const results: any[] = []

    for (const kw of keywords) {
      try {
        // Search for the keyword on Brave
        const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(kw.keyword)}&count=50`
        const response = await fetch(searchUrl, {
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': braveApiKey || ''
          }
        })

        if (!response.ok) {
          console.error(`Brave API error for "${kw.keyword}":`, response.statusText)
          continue
        }

        const data = await response.json()
        const searchResults = data.web?.results || []

        // Find rank for our domain
        let rank: number | null = null
        for (let i = 0; i < searchResults.length; i++) {
          const result = searchResults[i]
          const resultUrl = result.url?.toLowerCase() || ''
          if (resultUrl.includes(domain.toLowerCase())) {
            rank = i + 1
            break
          }
        }

        // Save rank check to database
        const { error: insertError } = await supabase
          .from('rank_checks')
          .insert([
            {
              keyword_id: kw.id,
              rank: rank
            }
          ])

        if (insertError) {
          console.error('Error saving rank check:', insertError)
        }

        results.push({
          keyword: kw.keyword,
          rank: rank || 'Not found in top 50'
        })

        // Rate limiting: wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error checking keyword "${kw.keyword}":`, error)
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Checked ${results.length} keywords`
    })
  } catch (error: any) {
    console.error('Error in check-rankings API:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
