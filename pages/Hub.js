import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';


import Upkeep from "../artifacts/contracts/Upkeep.sol/UpkeepIDConsumerExample.json";
import Hub from "../artifacts/contracts/Hub.sol/Hub.json";
import { HUB_ADDRESS, UPKEEP_ADDRESS } from "../config.js";
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

    // const { config: upkeepConfig, error:upkeepError } = usePrepareContractWrite({
    //     address: UPKEEP_ADDRESS,
    //     abi: Upkeep.abi,
    //     functionName: 'registerAndPredictID',
    //     args: [{
    //         name: "KalKal",
    //         encryptedEmail: "0x",
    //         upkeepContract: contractAddress,
    //         gasLimit: 5000000,
    //         adminAddress: "0x7599d1DB45B881A80c66FD6A02144c65E553a9E2",
    //         checkData: "0x",
    //         offchainConfig: "0x",
    //         amount: ethers.utils.parseEther("6"), 
    //     }],
    //     onError(error) {
    //         console.log('Upkeep registration faced error', error)
    //     },
    //     onSuccess(data) {
    //         console.log('Form is populated for upkeep registration', data)
    //     }
    // })

    // const { data: upkeepData, isLoading: upkeepLoading, isSuccess: upkeepSuccess, write:upkeepWrite } = useContractWrite({
    //     ...upkeepConfig,
    //     onError(error) {
    //         console.log('Error happened while registering upkeep!', error)
    //     }, 
    //     onSuccess(success) {
    //         console.log('Upkeep registration successful', success)
    //     },
    //     onSettled(response) {
    //         console.log("Upkeep Registered:", response)
    //     }
    // })


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
            <div className='w-1/2'>
                <RecentGames></RecentGames>
            </div>

            <div className='w-1/2'>
                {/* {isLoading && 
                <div class="flex justify-center items-center h-full">
                    <p class="text-center">Check you wallet</p>
                </div>
                }

                {isSuccess && 
                <div class="flex justify-center items-center h-full">
                    <p class="text-center">Loading...</p>
                </div>
                } */}

                {/* {!isLoading & !isSuccess && */}
                <div className='w-full'>
                    <div className='flex justify-between px-2 py-3'>
                        <ConnectButton></ConnectButton>
                    </div>
                    {contractAddress}
                    {/* {upkeepLoading}
                    {upkeepSuccess}  */}
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
                            {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => upkeepWrite}
                            disabled={!contractAddress}
                            >
                            Register contract as upkeep
                            </button> */}
                        </form> 
                    </div>
                </div>
                {/* } */}
            </div>
        </div>
    )
} 