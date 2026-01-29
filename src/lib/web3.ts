import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'SEO Rank Tracker' }),
  ],
  transports: {
    [base.id]: http(),
  },
})

// Contract ABI for subscription checking
export const SUBSCRIPTION_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'subscriber', type: 'address' }],
    name: 'isActive',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tierId', type: 'uint256' },
      { internalType: 'uint256', name: 'cycles', type: 'uint256' },
    ],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '8453')

// Subscription tiers (matching smart contract)
export const TIERS = {
  STARTER: { id: 0, price: 9, name: 'Starter', sites: 3, keywords: 50 },
  PRO: { id: 1, price: 29, name: 'Pro', sites: 10, keywords: 200 },
  AGENCY: { id: 2, price: 99, name: 'Agency', sites: 999, keywords: 1000 },
}
