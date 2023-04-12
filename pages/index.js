import Head from 'next/head';
import Router from 'next/router';
import 'tailwindcss/tailwind.css';
import CustomFooter from "./components/footer.js";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'



export default function Home() {

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
      Router.push('/createGame')    
    }
  })

  return (
    <div>
      <Head>
        <title>KalKal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen bg-gradient-to-b from-rose-400 to-violet-900 flex justify-center">
        <div className='flex flex-col items-center'>
          <h1 className='text-center text-4xl pt-40'>
            Welcome to <b>KalKal</b>
          </h1>

          <p className='text-center my-5 text-lg'>Are you good at recognizing cryptocurrencies that are going to skyrocket?</p>
          <p className='pb-5'>connect your wallet to enter the game</p>
          <ConnectButton></ConnectButton>
        </div>
      </div>
      
      <CustomFooter></CustomFooter>
    </div>
  )
}