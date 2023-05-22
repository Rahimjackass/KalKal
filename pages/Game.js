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

    const [ recentOption, setRecentOption ] = useState(null);

    const [ choice, setChoice ] = useState(null);
    const [ name, setName ] = useState(null)

    const [ paused, setPaused ] = useState(null)
    const [ winnerName, setWinnerName ] = useState(null);

    const handleButtonClick = (option) => {
        setRecentOption(option);
    };

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

    // useContractRead({
    //     address: contract,
    //     abi: GameArtifact.abi,
    //     functionName: 'winnerName',
    //     onError(error) {
    //         console.log('Error', error)
    //     },
    //     onSuccess(data) {
    //         console.log('Success', data)
    //     },
    //     onSettled(data) {
    //       console.log("data:", data)
    //       setWinnerName(data);
    //     }
    // })

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

        <div className="h-full bg-gradient-to-b from-rose-400 to-violet-900">
            <header className="bg-gray-800 text-white p-4">
                <div className="flex justify-between">
                    <Link href="./Hub"><h1 className="text-xl font-bold ml-5">KalKal</h1></Link>
                    <div className="flex">
                        <h2 className='pr-1'>Game Status:</h2>
                        {paused ? <p className="text-red-500">  Not started/Finished</p> : <p className="text-green-600">Ongoing</p>}
                    </div>
                    <ConnectButton></ConnectButton>
                </div>
            </header>
            <div className="flex">
                <div className="w-3/6 h-screen border rounded-md mr-0.5">
                    <RecentPlayers contract={contract}></RecentPlayers>
                </div>

                <div className="w-3/6 h-screen rounded-md ml-0.5">
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
                        <Information></Information>

                        <div className="h-1/4 flex justify-center items-center">
                            <input type="text" placeholder="Enter your name" onChange={(x) => setName(x.target.value)}></input>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={choice == null || !name} onClick={write}>Place bet</button>
                        </div>

                        <div className="flex flex-wrap w-full h-3/4">
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 0 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(0)}>BTC</button>
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 1 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(1)}>ETH</button>
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 2 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(2)}>LINK</button>
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 3 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(3)}>MATIC</button>
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 4 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(4)}>SAND</button>
                            <button className={`w-28 mx-1 h-1/4 border rounded-3xl ${choice === 5 ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(5)}>SOL</button>
                        </div> 
                        <div className='flex justify-center items-center h-full'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={startWrite}>Start</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={endWrite}>End</button>
                        </div>
                    </div>
                    }
                </div>                  
            </div>
        </div>
  
    )
}