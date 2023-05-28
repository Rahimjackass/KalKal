import { useState, useEffect } from 'react';
import { HUB_ADDRESS } from '../../config';
import Hub  from "../../artifacts/contracts/Hub.sol/Hub.json";
import Link from 'next/link';

const { ethers } = require('ethers');

export default function RecentGames () {
    const [response, setResponse] = useState([]);

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    const contractAbi = Hub.abi;


    const getEvent = async () => {
        try {
            const contract = new ethers.Contract(HUB_ADDRESS, contractAbi, provider);
            let counter = await contract.games();
            // console.log(counter);
            counter = counter.toNumber()

            for (let i=1; i<counter+1; i++) {
                const response = await contract.getGameInformation(i);
                const address = response[0]
                const ticket = response[1].toNumber()
                const period = response[2].toNumber()

                const object = {
                    address,
                    ticket,
                    period,
                    number: i,
                }

                console.log(object);
                setResponse((x) => [...x, object])
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEvent()
        return () => {
            setResponse([]);
        };
    }, [])

    return (
        <div className="border rounded-t-md h-full w-full mx-1 my-1">
            <header className="bg-gray-800 text-white p-4 text-center rounded-t-md">
                <h1 className="text-2xl font-bold">Recent Games</h1>
            </header>
            <div className='flex my-2 text-white'>
                <p className='w-1/6 text-center text-md'>#</p>
                <p className="w-1/2 text-center text-md">Contract Address</p>
                <p className='w-1/6 text-center text-md'>Ticket</p>
                <p className='w-1/6 text-center text-md'>Period</p>
            </div>
            {
                response.map((x) => (
                    <Link href={`/Game?contract=${x.address}`}>
                        <div className='flex justify-center items-center py-2 my-1 mx-1 bg-white border rounded-lg hover:bg-blue-300' key={x.number}>
                            <p className='w-1/6 text-center text-md'>{x.number}</p>
                            <p className='text-center text-xs pl-3'>{x.address}</p>
                            <p className='w-1/6 text-center text-xs'><b>{x.ticket}</b> MATIC</p>
                            <p className='w-1/6 text-center text-xs'><b>{x.period}</b> Sec</p>     
                        </div>
                    </Link>
                ))
            }


            {/* <button onClick={() => console.log(response)}>Click to see response</button> */}
        </div>
    )
}