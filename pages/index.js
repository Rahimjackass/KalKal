import Head from 'next/head';
import Router from 'next/router';
import 'tailwindcss/tailwind.css';
import CustomFooter from "./components/footer.js";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import Image from 'next/image';



export default function Home() {

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
      Router.push('/Hub')    
    }
  })

  return (
    <div>
      <Head>
        <title>KalKal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-top bg-cover flex flex-col justify-center items-center" style={{ backgroundImage: "url('/background.png')"}}>

        <div className='bg-gradient-to-b from-blue-300 to-red-400 flex flex-col items-center justify-center w-80 rounded-3xl px-1 py-10 mb-10'>
          <h1 className='text-3xl pb-5'>Welcome to <b>KalKal</b></h1>
          <p className='text-white text-sm text-center px-2 mb-6'>bet on prices, win big!</p>
          <ConnectButton label="connect wallet" />
        </div>


        {/* <h1 className='text-center text-4xl text-lime-950 mb-6'>
          don't argue! use <b>KalKal</b>
        </h1> */}
        {/* <div className='flex flex-col items-center border'>
          <p className='py-2'> - ( 0 )</p>
          <p className='py-2'> - ( 1 )</p>
          <p className='py-2'> - ( 3 )</p>
          <p className='py-2'> - ( 4 )</p>

        </div> */}
      </div>
      <CustomFooter></CustomFooter>
    </div>
  )
}
//


