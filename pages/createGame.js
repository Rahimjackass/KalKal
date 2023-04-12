import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi';

import Hub from "../artifacts/contracts/Hub.sol/Hub.json";
import HUB_ADDRESS from "../config.js";
import RecentGames from './components/recentGames';



export default function CreateGame () {

    const router = useRouter();

    const [ players, setPlayers ] = useState(0)
    const [ ticket, setTicket ] = useState(0)
    const [ contractAddress, setContractAddress ] = useState(null)

    useContractEvent({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        eventName: 'gameCreated',
        listener(players, ticketPrice, contractAddress, creator) {
            console.log(players, ticketPrice, contractAddress, creator)
            setContractAddress(contractAddress)
        },
        once: true,
    })

    const { config, error } = usePrepareContractWrite({
        address: HUB_ADDRESS,
        abi: Hub.abi,
        functionName: 'createGame',
        args: [players, ticket],
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
            console.log('Contract Creation Successful', success)
        },
        onSettled(response) {
            console.log("Transaction Response:", response)
        }
    })

    useEffect(() => {
        if (contractAddress) {
            router.push(`/Game?contract=${contractAddress}`);
        }
    }, [contractAddress])

    return (
        <div className='h-screen flex bg-gradient-to-b from-violet-900'>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            {!isLoading & !isSuccess &&
            <div className='flex w-full h-full'>
                <div className='w-2/5'>
                    <RecentGames></RecentGames>
                </div>

                <div className='w-3/5 flex items-center justify-center'>
                    <form className="w-1/2 ">
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="ticketPrice">
                            How much is the ticket to the game? ( in MATIC )
                            </label>
                            <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ticketPrice"
                            type="number"
                            placeholder="example 20"
                            onChange={(x) => setTicket(x.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="players">
                            How many players are going to take part?
                            </label>
                            <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="players"
                            type="number"
                            placeholder="example 4"
                            onChange={(x) => setPlayers(x.target.value)}
                            />
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
    )
} 