import Head from 'next/head';
import Router from 'next/router';
import 'tailwindcss/tailwind.css';
import CustomFooter from "./components/footer.js";
import { useAccount } from 'wagmi';

export default function Home() {
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      Router.push('/Hub');
    }
  });

  return (
    <div>
      <Head>
        <title>KalKal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-top bg-cover flex flex-col" style={{ backgroundImage: "url('/background.png')" }}>
        <div className="h-20 fixed w-full flex justify-center items-center text-white bg-gradient-to-b from-blue-900"></div>
        <div className='h-full w-full flex justify-center items-center'>
          <iframe
            width="1000"
            height="600"
            src="https://www.youtube.com/embed/UYMho0MvOyI"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <CustomFooter></CustomFooter>
    </div>
  );
}
