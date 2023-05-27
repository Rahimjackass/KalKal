import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import {useState, useEffect} from "react";

import { usePrepareContractWrite, useContractWrite, useContractEvent, useContractRead } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';

import GameArtifact from "../artifacts/contracts/Game.sol/Game.json";
import Link from 'next/link';
import RecentPlayers from './components/recentPlayers';
import Information from './components/information';

export default function Game () {

    const router = useRouter();

    const { contract } = router.query;

    const [ choice, setChoice ] = useState(null);
    const [ name, setName ] = useState(null)

    const [ paused, setPaused ] = useState(null)

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'paused',
        onError(error) {
            console.log('Error', error)
        },
        onSuccess(data) {
            console.log('Success', data)
        },
        onSettled(data) {
          console.log("data:", data)
          setPaused(data);
        }
    })

    const { config, error } = usePrepareContractWrite({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'takePart',
        args: [name, choice],
        onError(error) {
            console.log('Error', error)
        },
        onSuccess(data) {
            console.log('takePart function prepared!', data)
        }
    })
    

    const { data, isLoading, isSuccess, write} = useContractWrite({
        ...config,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        onSuccess(success) {
            console.log('Player Registered!', success)
        },
        onSettled(response) {
            console.log("Transaction Receipt:", response)
            setTimeout(() => {
                location.reload();
            }, 10000)
        }
    })

    const { config: startConfig, error: startError } = usePrepareContractWrite({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'startGame',
        onError(error) {
            console.log('Error Happened', error)
        },
        onSuccess(data) {
            console.log('startGame function prepared!', data)
        }
    })
    

    const { data: startData, isLoading: startLoading, isSuccess: startSuccess, write: startWrite } = useContractWrite({
        ...startConfig,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        onSuccess(success) {
            console.log('Game Started!', success)
        },
        onSettled(response) {
            console.log("Transaction Receipt:", response)
            setTimeout(() => {
                location.reload();
            }, 10000)
        }
    })

    const { config: endConfig, error: endError } = usePrepareContractWrite({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'endGame',
        onError(error) {
            console.log('Error Happened', error)
        },
        onSuccess(data) {
            console.log('endGame function prepared!', data)
        }
    })
    

    const { data: endData, isLoading: endLoading, isSuccess: endSuccess, write: endWrite } = useContractWrite({
        ...endConfig,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        onSuccess(success) {
            console.log('Game Ended!', success)
        },
        onSettled(response) {
            console.log("Transaction Receipt:", response)
            setTimeout(() => {
                location.reload();
            }, 10000)
        }
    })

    return (

        <div className="h-full bg-gradient-to-b from-rose-600 to-violet-500">
            <header className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                    <Link href="./Hub"><h1 className="text-xl font-bold ml-5">KalKal</h1></Link>
                    <div className="flex items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline" onClick={startWrite}>Start</button>
                        <h2 className='pr-1'>Game Status:</h2>
                        {paused ? <p className="text-red-500">  Not started/Finished</p> : <p className="text-green-600">Ongoing</p>}
                    </div>
                    <ConnectButton></ConnectButton>
                </div>
            </header>
            <div className="flex">
                <div className="w-3/6 h-screen rounded-md">
                    {isLoading || startLoading || endLoading && 
                    <div class="flex justify-center items-center h-full">
                        <p class="text-center">Check your wallet</p>
                    </div>
                    }

                    {isSuccess || endSuccess || startSuccess && 
                    <div class="flex justify-center items-center h-full">
                        <p class="text-center">Loading...</p>
                    </div>
                    }

                    {!isLoading & !isSuccess && 
                    <div>
                        <p className='text-center text-white my-2'>( 1 ) pick a coin</p>
                        <div className="w-full mt-2 flex px-1.5">
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 0 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(0)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./btc.png"></img></button>                            
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 1 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(1)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./eth.png"></img></button>                            
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 2 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(2)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./link.png"></img></button>                            
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 3 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(3)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./matic.png"></img></button>                            
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 4 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(4)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./sand.png"></img></button>                            
                            <button className={`w-20 py-10 my-1 ml-1 rounded-3xl ${choice === 5 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(5)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./sol.png"></img></button>                            
                        </div> 
                        <p className='text-center text-white mb-1 mt-4'>( 2 ) enter your name and submit</p>
                        <div className='my-2 mx-2 flex justify-center'>
                            <input className="w-full h-10 rounded-md px-2" type="text" placeholder="Rahimjackass" onChange={(x) => setName(x.target.value)}></input>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" disabled={choice == null || !name} onClick={write}>submit</button>
                        </div>
                        {/* <Information></Information> */}
                    </div>
                    }
                </div>     
                <div className="w-4/6 h-screen border rounded-md">
                    <RecentPlayers contract={contract}></RecentPlayers>
                </div>             
            </div>
        </div>
  
    )
}