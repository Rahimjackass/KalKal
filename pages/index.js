import Head from 'next/head';
import Router from 'next/router';
import 'tailwindcss/tailwind.css';
import CustomFooter from "./components/footer.js";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
// import Image from 'next/image';
import YouTube from 'react-youtube';
import { useState } from 'react';


const videoId = 'UYMho0MvOyI&t'; // Replace with the actual YouTube video ID or URL

const opts = {
  height: '576',
  width: '1024',
}


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
      <div className="h-screen bg-top bg-cover flex flex-col " style={{ backgroundImage: "url('/background.png')"}}>
        <div className="h-20 fixed w-full flex justify-center items-center text-white bg-gradient-to-b from-blue-900"></div>
        <div className='h-full w-full flex justify-center items-center'>
          <YouTube videoId={videoId} opts={opts}/>
        </div>
      </div>
      <CustomFooter></CustomFooter>
    </div>
  )
}
//


