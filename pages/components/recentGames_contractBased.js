import { useState, useEffect } from 'react';
import { HUB_ADDRESS } from '../../config';

import Hub  from "../../artifacts/contracts/Hub.sol/Hub.json";
import GameArtifact from "../../artifacts/contracts/Game.sol/Game.json";

import Link from 'next/link';
import PacmanLoader from "react-spinners/ClipLoader";


const { ethers } = require('ethers');

export default function RecentGames () {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    const contractAbi = Hub.abi;
    const gameAbi = GameArtifact.abi;

    const getEvent = async () => {
        setLoading(true)
        try {
            const contract = new ethers.Contract(HUB_ADDRESS, contractAbi, provider);
            let counter = await contract.games();
            // console.log(counter);
            counter = counter.toNumber()

            for (let i=1; i<counter+1; i++) {
                const response = await contract.getGameInformation(i);
                // console.log(response);
                const address = response[0]
                const adminName = response[2]
                const ticket = response[3].toNumber()
                const period = response[4].toNumber()

                const babyContract = new ethers.Contract(address, gameAbi, provider);
                const started = await babyContract.started();
                let balance = await babyContract.getBalance();

                balance = ethers.utils.formatEther(balance);
                balance = parseInt(balance);

                const object = {
                    address,
                    adminName,
                    ticket,
                    period,
                    number: i,
                    started,
                    balance
                }

                console.log(object);
                setResponse((x) => [object, ...x])
            }
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getEvent()
        return () => {
            setResponse([]);
        };
    }, [])

    return (
        <div className="border border-b-0 rounded-t-md h-full w-full mx-1 my-1">
            <header className="bg-gray-800 text-white p-4 text-center rounded-t-md">
                <h1 className="text-2xl font-bold">Recent Games</h1>
            </header>
            <div className='flex my-2 text-white'>
                <p className='w-1/12 text-center text-xs'>#</p>
                <p className='w-3/12 text-center text-xs'>admin</p>
                <p className="w-3/12 text-center text-xs">table</p>
                <p className='w-2/12 text-center text-xs'>ticket</p>
                <p className='w-3/12 text-center text-xs'>period</p>
                <p className='w-3/12 text-center text-xs'>balance</p>
            </div>
            {
                loading ? 
                <div className="flex justify-center items-center h-screen">
                    <PacmanLoader color="#000000" size={50}/>
                </div>
                :
                response.map((x) => (
                    <Link href={`/Game?contract=${x.address}`}>
                        <div className={`flex items-center py-1 my-1 mx-1 ${x.started ? "bg-neutral-700 text-white border" : "bg-cyan-300 hover:bg-transparent"} rounded-lg `} key={x.number}>
                            <p className='w-1/12 text-center text-xs'>{x.number}</p>
                            <p className='w-3/12 text-center text-xs'>{x.adminName}</p>
                            <p className='w-3/12 text-center text-xs'>{`${x.address.slice(0, 4)}...${x.address.slice(-4)}`}</p>
                            <p className='w-2/12 text-center text-xs'>{x.ticket} matic</p>
                            <p className='w-3/12 text-center text-xs'>{x.period} sec</p>     
                            <p className='w-3/12 text-center text-xs'>{x.balance > 0 ? `${x.balance} matic` : "-"} </p>     
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}