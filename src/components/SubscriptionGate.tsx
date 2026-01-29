'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, SUBSCRIPTION_ABI, TIERS } from '@/lib/web3'
import { useState } from 'react'
import { parseEther } from 'viem'

import { useConnect } from 'wagmi'

export function SubscriptionGate({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const [selectedTier, setSelectedTier] = useState(TIERS.PRO.id)

  // Check if user has active subscription
  const { data: isActive, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SUBSCRIPTION_ABI,
    functionName: 'isActive',
    args: address ? [address] : undefined,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  async function subscribe() {
    const tier = selectedTier === TIERS.STARTER.id ? TIERS.STARTER :
                 selectedTier === TIERS.PRO.id ? TIERS.PRO :
                 TIERS.AGENCY
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: SUBSCRIPTION_ABI,
      functionName: 'subscribe',
      args: [BigInt(tier.id), BigInt(1)], // 1 cycle (month)
      value: parseEther(tier.price.toString()),
    })
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access the SEO Rank Tracker.
          </p>
          <div className="space-y-3">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Connect with {connector.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Checking subscription...</div>
      </div>
    )
  }

  if (!isActive && !isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Subscribe to start tracking your rankings
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Starter */}
            <div 
              onClick={() => setSelectedTier(TIERS.STARTER.id)}
              className={`border-2 rounded-lg p-6 cursor-pointer transition ${
                selectedTier === TIERS.STARTER.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{TIERS.STARTER.name}</h3>
              <p className="text-3xl font-bold mb-4">${TIERS.STARTER.price}<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ {TIERS.STARTER.sites} websites</li>
                <li>✓ {TIERS.STARTER.keywords} keywords</li>
                <li>✓ Daily tracking</li>
              </ul>
            </div>

            {/* Pro */}
            <div 
              onClick={() => setSelectedTier(TIERS.PRO.id)}
              className={`border-2 rounded-lg p-6 cursor-pointer transition relative ${
                selectedTier === TIERS.PRO.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">{TIERS.PRO.name}</h3>
              <p className="text-3xl font-bold mb-4">${TIERS.PRO.price}<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ {TIERS.PRO.sites} websites</li>
                <li>✓ {TIERS.PRO.keywords} keywords</li>
                <li>✓ Daily tracking</li>
                <li>✓ Email alerts</li>
              </ul>
            </div>

            {/* Agency */}
            <div 
              onClick={() => setSelectedTier(TIERS.AGENCY.id)}
              className={`border-2 rounded-lg p-6 cursor-pointer transition ${
                selectedTier === TIERS.AGENCY.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{TIERS.AGENCY.name}</h3>
              <p className="text-3xl font-bold mb-4">${TIERS.AGENCY.price}<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Unlimited websites</li>
                <li>✓ {TIERS.AGENCY.keywords} keywords</li>
                <li>✓ Daily tracking</li>
                <li>✓ API access</li>
              </ul>
            </div>
          </div>

          <button
            onClick={subscribe}
            disabled={isPending || isConfirming}
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending || isConfirming ? 'Processing...' : 'Subscribe with ETH'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Payment via Base network • Cancel anytime
          </p>
        </div>
      </div>
    )
  }

  // User has active subscription, show app
  return <>{children}</>
}
