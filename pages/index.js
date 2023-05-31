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
//bg-gradient-to-b from-blue-300 to-red-400
  return (
    <div>
      <Head>
        <title>KalKal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-top bg-cover flex flex-col " style={{ backgroundImage: "url('/background.png')"}}>
        {/* <div className='bg-gradient-to-b from-red-400 to-blue-600 mb-10'>
          <h1 className='text-3xl text-center text-white py-6'>KalKal</h1>
        </div> */}

        <div className='bg-gradient-to-b from-blue-800 w-96 mx-auto rounded-3xl-b pb-5 pt-4 mb-10 mt-40 border-2 border-black border-b-0 rounded-t-lg'>
          <p className='text-white bg-emerald-500 text-xs text-left px-3 py-2 rounded-e-2xl w-auto my-2 mr-52'>which crypto this month?</p>
          <p className='text-white bg-emerald-500 text-xs text-right px-3 py-2 rounded-s-2xl my-2 ml-64'>I would say ETH</p>
          <p className='text-white bg-emerald-500 text-xs text-left px-3 py-2 rounded-e-2xl my-2 mr-64'>but I think BTC</p>
          <p className='text-white bg-emerald-500 text-xs text-right pl-3 pr-5 py-2 rounded-s-2xl my-2 ml-64'>Are you sure?</p>
          <p className='text-white bg-emerald-500 text-xs text-left px-3 py-2 rounded-e-2xl my-2 mr-56'>Yeah! Let's make a bet</p>
        </div>
        {/* <div className='mx-auto'>
          <ConnectButton label="connect wallet" />
        </div> */}
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


