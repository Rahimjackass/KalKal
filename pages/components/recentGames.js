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
            const blockNumber = await provider.getBlockNumber();
            console.log("Current Block Number:", blockNumber);
            const filter = {
                address: HUB_ADDRESS,
                fromBlock: blockNumber - 999,
                toBlock: blockNumber,
            };
            // get the event logs
            const logs = await provider.getLogs(filter);
            if(logs.length > 0) {
                console.log("Logs:", logs);
                // decode the logs
                const decodedLogs = logs.map(log => contract.interface.parseLog(log));
        
                decodedLogs.map((x) => {
                    console.log(x)
                    const address = x.args[2].toString();
                    const period = x.args[3].toNumber();
                    const players = x.args[0].toNumber();
                    const ticket = x.args[1].toNumber();
    
                    const object = {
                        address,
                        players,
                        ticket,
                        period
                    }
                    // console.log(object)
                    setResponse((x) => [...x, object])
                })
                console.log("Response:", response)
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
                <p className="w-3/6 text-center text-md">Contract Address</p>
                <p className='w-1/6 text-center text-md'>Players</p>
                <p className='w-1/6 text-center text-md'>Ticket</p>
                <p className='w-1/6 text-center text-md'>Period</p>
            </div>
            {
                response.map((x) => (
                    <Link href={`/Game?contract=${x.address}`}>
                        <div className='flex py-2 my-1 mx-1 bg-white border rounded-lg hover:bg-blue-300' key={x.address}>
                        <p className='w-3/6 text-center text-xs pl-3'>{x.address}</p>
                        <p className='w-1/6 text-center text-xs'><b>{x.players}</b></p>     
                        <p className='w-1/6 text-center text-xs'><b>{x.ticket}</b> MATIC</p>
                        <p className='w-1/6 text-center text-xs'><b>{x.period}</b></p>     
                        </div>
                    </Link>
                ))
            }


            {/* <button onClick={() => console.log(response)}>Click to see response</button> */}
        </div>
    )
}