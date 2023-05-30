import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent } from 'wagmi';
import Link from 'next/link';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Hub from "../artifacts/contracts/Hub.sol/Hub.json";
import { HUB_ADDRESS, UPKEEP_ADDRESS } from "../config.js";
import PRICE_FEED_ADDRESS from "../config.js";

import RecentGames from './components/recentGames_contractBased';

import PacmanLoader from "react-spinners/ClipLoader";

export default function CreateGame () {

    const router = useRouter();

    // const [ players, setPlayers ] = useState(0);

    const [ ticket, setTicket ] = useState(0);
    const [ period, setPeriod ] = useState(0);
    const [ contractAddress, setContractAddress ] = useState(null)

    useContractEvent({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        eventName: 'gameCreated',
        listener(ticketPrice, contractAddress, period, creator) {
            console.log(ticketPrice, contractAddress, period, creator)
            setContractAddress(contractAddress)
        },
        once: true,
    })

    const { config, error } = usePrepareContractWrite({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        functionName: 'createGame',
        args: [ticket, period],
        onError(error) {
            console.log('Error Happened for Creation Form', error)
        },
        onSuccess() {
            console.log('Creation Form is populated')
        }
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({
        ...config,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        // onSuccess(success) {
        //     console.log('Game Creation Successful', success)
        // },
        onSettled(response) {
            console.log("New Game Created:", response)
        }
    })


    useEffect(() => {
        if (contractAddress) {
            router.push({
                pathname: '/Game',
                query: { contract: contractAddress}
            });
        }
    }, [contractAddress])


    return (
        <div className='h-screen flex bg-gradient-to-b from-violet-700'>
            <div className='w-1/2'>
                <RecentGames></RecentGames>
            </div>
            {/* {contractAddress} */}
            <div className='w-1/2'>

                {isLoading || isSuccess ? 
                <div className="flex justify-center items-center h-screen">
                    <PacmanLoader color="#000000" size={50}/>
                </div>
                :
                <div className='w-full'>
                    <div className='flex justify-between px-3 py-3'>
                        <Link href="https://mumbaifaucet.com/" target="_blank" className='bg-blue-500 text-white font-bold rounded-lg px-2 py-1'>test tokens</Link>
                        <ConnectButton chainStatus="icon"></ConnectButton>
                    </div>
                    <div className='flex flex-col bg-green-600 border border-transparent w-auto rounded-3xl py-3 mx-3'>
                        <h1 className='text-lg text-left mb-1.5 pl-4'>how to create a game?</h1>
                        <div className='text-left'>
                            {/* <p className='text-white text-sm px-3'></p> */}
                            <p className='text-white text-sm px-3'>- what is period?</p>
                            <p className='text-white text-sm px-3'>- what is ticket price?</p>
                            {/* <p className='text-white text-sm px-3'>- pick a cryptocurrency, enter your name, and submit your bet</p>
                            <p className='text-white text-sm px-3'>- invite your friends to do the same</p>
                            <p className='text-white text-sm px-3'>- start the game</p> */}
                        </div>
                    </div>
                    {contractAddress}
                    <div className='h-screen flex justify-center'>
                        <form className='w-3/5 mt-40'>
                            {/* <div className="mb-4">
                                <label className="block text-white mb-2 text-xs" htmlFor="players">
                                Number of players
                                </label>
                                <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="players"
                                type="number"
                                placeholder="example 4"
                                onChange={(x) => setPlayers(x.target.value)}
                                />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-white mb-2 text-xs" htmlFor="priod">
                                Game duration in seconds
                                </label>
                                <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="period"
                                type="number"
                                placeholder="example 50"
                                onChange={(x) => setPeriod(x.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2 text-xs" htmlFor="ticketPrice">
                                Ticket price in Matic
                                </label>
                                <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="ticketPrice"
                                type="number"
                                placeholder="example 20"
                                onChange={(x) => setTicket(x.target.value)}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => write?.()}
                                disabled={period==0 || ticket==0}
                                >
                                Create Game
                                </button>
                                {/* <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="./searchGame"
                                >
                                You already in a game?
                                </a> */}
                            </div>
                        </form> 
                    </div>
                </div>
                }
            </div>
        </div>
    )
} 