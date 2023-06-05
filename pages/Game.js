import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useState } from "react";

import { ethers } from 'ethers';

import { usePrepareContractWrite, useContractWrite, useContractEvent, useContractRead, useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import GameArtifact from "../artifacts/contracts/Game.sol/Game.json";

import RecentPlayers from './components/recentPlayers';
import Information from './components/information';
import CountDown from './components/CountDown';

import PacmanLoader from "react-spinners/ClipLoader";
// import  from 'react-countdown';


export default function Game () {

    const router = useRouter();

    const { address } = useAccount()

    const { contract } = router.query;

    const [ admin, setAdmin ] = useState(null);

    const [ choice, setChoice ] = useState(null);
    const [ name, setName ] = useState(null)

    const [ ticketPrice, setticketPrice ] = useState(0)

    const [ paused, setPaused ] = useState(null)

    const [ currentTimestamp, setCurrentTimestamp ] = useState(null)
    const [ start, setStart ] = useState(null)
    const [ period, setPeriod] = useState(null)

    const [ winners, setWinners ] = useState(null)
    
    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'paused',
        onError(error) {
            console.log('Error while reading paused variable', error)
        },
        onSettled(data) {
          console.log("Paused Variable:", data)
          setPaused(data);
        }
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'adminAddress',
        onError(error) {
            console.log('Error', error)
        },
        onSettled(data) {
          console.log("Admin Variable:", data)
          setAdmin(data);
        }
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'ticketPrice',
        onSuccess(data) {
            console.log('Ticket:', data.toNumber())
            console.log(data)
            setticketPrice(data.toNumber())
        },
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'getTimestamp',
        onSuccess(data) {
            console.log('Current Timestamp:', data.toNumber())
            setCurrentTimestamp(data.toNumber())
        },
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'start',
        onSuccess(data) {
            console.log('Start Timestamp:', data.toNumber())
            setStart(data.toNumber())
        },
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'period',
        onSuccess(data) {
            console.log('Period:', data.toNumber())
            setPeriod(data.toNumber())
        },
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'winners',
        onSuccess(data) {
            console.log('Winners:', data.toNumber())
            setWinners(data.toNumber())
        },
    })

    const { config } = usePrepareContractWrite({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'takePart',
        args: [name, choice],
        overrides: {
            from: address,
            value: ethers.utils.parseUnits(ticketPrice.toString(), "ether")
        },
        onError(error) {
            console.log('TAKEPART PREPARATION ERROR', error)
        },
        // onSuccess(data) {
        //     console.log('takePart function prepared!', data)
        // }
    })
    

    const { isLoading, isSuccess, write} = useContractWrite({
        ...config,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        // onSuccess(success) {
        //     console.log('Player Registered!', success)
        // },
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
        // onSuccess(data) {
        //     console.log('startGame function prepared!', data)
        // }
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
    const { config: endConfig } = usePrepareContractWrite({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'endGame',
        onError(error) {
            console.log('Error Happened', error)
        },
        // onSuccess(data) {
        //     console.log('startGame function prepared!', data)
        // }
    })
    

    const { write: endWrite } = useContractWrite({
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
                        {paused && winners == 0 && 
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline" onClick={startWrite} hidden={admin != address}>Start</button>
                        }
                        <h2 className='pr-1'>Game Status:</h2>
                        {!paused ? 
                            <p className="text-green-600">ongoing</p>
                            :
                            winners > 0 ?
                            <p className="text-red-500">finished</p> 
                            :
                            <p className="text-blue-500">not started yet</p> 
                        }
                    </div>
                    <ConnectButton></ConnectButton>
                </div>
            </header>
            {startLoading || startSuccess ? 
            <p>Starting the game...</p>
            :
            <div className="flex">
                <div className="w-3/6 h-screen rounded-md">
                    {isLoading || isSuccess ? 
                    <div className="flex justify-center items-center h-screen">
                        <PacmanLoader color="#000000" size={50}/>
                    </div>
                    :
                    <div>
                        <Information></Information>
                        {!paused && 
                            start && period && currentTimestamp &&
                            <div className="flex justify-center items-center">
                                <CountDown seconds={(start+period)-currentTimestamp}/>
                            </div>
                        }

                        {paused && winners < 1 &&
                        <div>
                            <div className='flex flex-col bg-green-600 border border-transparent w-auto rounded-3xl py-3 mx-3 my-3'>
                                <h1 className='text-lg text-left mb-1.5 pl-4'>How to get into the game?</h1>
                                <div className='text-left'>
                                    <p className='text-white text-sm px-3'>1 - first you need to select a coin</p>
                                    <p className='text-white text-sm px-3'>2 - then you must enter your name</p>
                                    <p className='text-white text-sm px-3'>3 - submit and wait until your name shows up on the table</p>
                                    <p className='text-white text-sm px-3'>4 - ( ONLY ADMIN ) start the game</p>
                                </div>
                            </div>
                            <div className="w-full mt-2 flex px-1.5">
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 0 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(0)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./btc.png"></img></button>                            
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 1 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(1)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./eth.png"></img></button>                            
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 2 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(2)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./link.png"></img></button>                            
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 3 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(3)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./matic.png"></img></button>                            
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 4 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(4)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-0.5" src="./sand.png"></img></button>                            
                                <button className={`w-1/6 py-10 my-1 ml-1 rounded-3xl ${choice === 5 ? 'bg-blue-500' : 'bg-fuchsia-200'} hover:bg-blue-500 text-white font-bold focus:outline-none focus:shadow-outline`} onClick={() => setChoice(5)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img className="px-1" src="./sol.png"></img></button>                            
                            </div> 
                            <div className='my-2 mx-2 flex justify-center'>
                                <input className="w-full h-10 rounded-md px-2" type="text" placeholder="Rahimjackass" onChange={(x) => setName(x.target.value)}></input>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" disabled={choice == null || !name} onClick={write}>submit</button>
                            </div>
                        </div>
                        }
                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline" onClick={endWrite}>End</button> */}
                        {/* now {currentTimestamp}
                        start {start}
                        period {period} */}

                        {/* remaining {()} */}
                    </div>
                    }
                </div>     
                <div className="w-4/6 h-screen border rounded-md">
                    <RecentPlayers contract={contract}></RecentPlayers>
                </div>          
            </div>
            }
        </div>  
    )
}