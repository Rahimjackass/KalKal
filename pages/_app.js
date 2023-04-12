import React from 'react';
import 'tailwindcss/tailwind.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    infuraProvider({ apiKey: process.env.INFURA_ID}),
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} showRecentTransactions={true}>
            <Component {...pageProps}/>  
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default MyApp;