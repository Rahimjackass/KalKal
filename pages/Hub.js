import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Hub from "../artifacts/contracts/Hub.sol/Hub.json";
import { HUB_ADDRESS } from "../config.js";
import PRICE_FEED_ADDRESS from "../config.js";
import RecentGames from './components/recentGames';
// const { verifyContract } = require("../utils/verifyContract");



export default function CreateGame () {

    const router = useRouter();

    const [ players, setPlayers ] = useState(0);
    const [ ticket, setTicket ] = useState(0);
    const [ period, setPeriod ] = useState(0);
    const [ contractAddress, setContractAddress ] = useState(null)
    // const audio = new Audio(myAudioFile);
    // audio.play();

    useContractEvent({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        eventName: 'gameCreated',
        listener(players, ticketPrice, contractAddress, period, creator) {
            console.log(players, ticketPrice, contractAddress, period, creator)
            setContractAddress(contractAddress)
        },
        once: true,
    })

    const { config, error } = usePrepareContractWrite({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        functionName: 'createGame',
        args: [players, ticket, period],
        onError(error) {
            console.log('Error', error)
        },
        onSuccess(data) {
            console.log('Form is populated', data)
        }
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({
        ...config,
        onError(error) {
            console.log('Error Happened!', error)
        }, 
        onSuccess(success) {
            console.log('Game Creation Successful', success)
        },
        onSettled(response) {
            console.log("New Game Created:", response)
            // console.log("Waiting 20 seconds before attempting to verify the contract...")
            // setTimeout(() => {
            //     hre.run("verify:verify", {
            //         address: contractAddress,
            //         constructorArguments: [
            //             PRICE_FEED_ADDRESS,
            //             players,
            //             ticket,
            //             period
            //         ],
            //     })
            // }, 20000)
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
        <div className='h-screen flex bg-gradient-to-b from-violet-900'>
            {/* <audio controls>
                <source src="../public/congrats.aiff" type="audio/mpeg" />
            </audio> */}
            <div className='w-1/2'>
                <RecentGames></RecentGames>
            </div>

            <div className='w-1/2'>
                {isLoading && 
                <div class="flex justify-center items-center h-full">
                    <p class="text-center">Check you wallet</p>
                </div>
                }

                {isSuccess && 
                <div class="flex justify-center items-center h-full">
                    <p class="text-center">Loading...</p>
                </div>
                }

                {!isLoading & !isSuccess &&
                <div className='w-full'>
                    <div className='flex justify-between px-2 py-3'>
                        <Link href="https://mumbaifaucet.com/" target="_blank" className='border bg-white text-black font-bold rounded-lg px-2 py-1 ml-1'>MATIC FAUCET</Link>
                        <ConnectButton></ConnectButton>
                    </div>
                    <div className='h-screen flex justify-center'>
                        <form className='w-3/5 mt-40'>
                            <div className="mb-4">
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
                            </div>
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
                                disabled={players==0 || ticket==0}
                                >
                                Create Game
                                </button>
                                <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="./searchGame"
                                >
                                You already in a game?
                                </a>
                            </div>
                        </form> 
                    </div>
                </div>
                }
            </div>
        </div>
    )
} 