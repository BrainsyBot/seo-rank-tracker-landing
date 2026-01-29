import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <span className="text-xl font-bold text-white">SEO Rank Tracker</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#features" className="text-slate-400 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Docs</a>
            </nav>
            <Link href="/login">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Track Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Google Rankings</span><br />Daily. Automatically.
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Monitor unlimited keywords across multiple sites. Get daily ranking updates, historical charts, and CSV exports. Perfect for SEO pros and agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/login">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition">
                Start Free Trial
              </button>
            </Link>
            <button className="bg-slate-800/50 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800 transition border border-slate-700">
              View Demo
            </button>
          </div>
          <p className="text-sm text-slate-500">✓ No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Stop Guessing Where You Rank
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="text-4xl mb-4">😓</div>
              <h3 className="text-xl font-bold text-white mb-3">Manual Checking is Exhausting</h3>
              <p className="text-slate-400">Searching Google for your keywords every day wastes hours and gives you personalized, inaccurate results.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold text-white mb-3">Expensive Tools</h3>
              <p className="text-slate-400">Ahrefs, SEMrush, and Moz cost $99-399/month. Too expensive for small sites and side projects.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-bold text-white mb-3">Missing Opportunities</h3>
              <p className="text-slate-400">Without daily tracking, you miss sudden drops, competitor changes, and ranking opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Everything You Need to Track Rankings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Daily Tracking</h3>
              <p className="text-slate-400">Automatic daily checks for all your keywords. Never manually search Google again.</p>
            </div>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-3">Historical Data</h3>
              <p className="text-slate-400">See how your rankings change over time with beautiful charts and trend analysis.</p>
            </div>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-bold text-white mb-3">CSV Exports</h3>
              <p className="text-slate-400">Export your ranking data anytime. Perfect for client reports and presentations.</p>
            </div>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Site Support</h3>
              <p className="text-slate-400">Track unlimited websites and domains. Perfect for agencies and portfolios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">Start tracking rankings today. No hidden fees.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>3 websites</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>50 keywords total</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Daily tracking</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>CSV exports</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>30 days history</span>
                </li>
              </ul>
              <Link href="/login" className="w-full">
                <button className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-b from-blue-900/50 to-purple-900/50 p-8 rounded-xl border-2 border-blue-500/50 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>10 websites</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>200 keywords total</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Daily tracking</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>CSV exports</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Unlimited history</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Email alerts</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/login" className="w-full">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>

            {/* Agency */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-2">Agency</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Unlimited websites</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>1,000 keywords</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Daily tracking</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>CSV exports</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Unlimited history</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Email + Slack alerts</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>White-label reports</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>API access</span>
                </li>
              </ul>
              <Link href="/login" className="w-full">
                <button className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-12 rounded-2xl border border-blue-500/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Tracking Your Rankings Today
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 500+ SEO professionals and agencies who track their rankings with us
          </p>
          <Link href="/login">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition">
              Start Free 14-Day Trial
            </button>
          </Link>
          <p className="text-sm text-slate-500 mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-slate-400">© 2026 SEO Rank Tracker</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Docs</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
