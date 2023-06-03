import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Game from "../../artifacts/contracts/Game.sol/Game.json";

const { ethers } = require('ethers');

export default function RecentPlayers() {

    const [ response, setResponse ] = useState([]);

    const router = useRouter();
    const { contract } = router.query;

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    console.log("The given contract", contract)


    // const getEvent = async () => {
    //     // preventDefaut();
    //     const target = new ethers.Contract(contract, Game.abi, provider);

    //     const blockNumber = await provider.getBlockNumber();
    //     console.log("Current Block Number:", blockNumber);

    //     const filter = {
    //         address: contract,
    //         fromBlock: blockNumber - 999,
    //         toBlock: blockNumber,
    //     };

    //     // get the event logs
    //     const logs = await provider.getLogs(filter);

    //     if(logs.length > 0) {
    //         // console.log("Logs:", logs);
    //         // decode the logs
    //         const decodedLogs = logs.map(log => target.interface.parseLog(log));
    
    //         decodedLogs.map((x) => {
    //             // console.log(x)
    //             const name = x.args[0];
    //             let response = x.args[1].toNumber();
    //             const choice = convert(response);

    //             // console.log("Name:", name)
    //             // console.log("Choice:", response)
    //             // console.log("Converted choice:", choice)

    //             const object = {
    //                 name,
    //                 choice,
    //             }
    //             // console.log(object)
    //             setResponse((x) => [...x, object])
    //         })
            
    //         // console.log("Response:", response)

    //     }
    // }

    const convert = (option) => {
        if(option == 0) {
            return "Bitcoin"
        } else if (option == 1) {
            return "Ethereum"
        } else if(option == 2) {
            return "Chainlink"
        } else if(option == 3) {
            return "Polygon"
        } else if (option == 4) {
            return "Sandbox"
        } else if (option == 5) {
            return "Solana"
        }
    }

    useEffect(() => {
        if(contract) {
            getPlayersInformation()
            return () => {
                setResponse([]);
            };
        }
    }, [contract])

    const getPlayersInformation = async () => {
        const target = new ethers.Contract(contract, Game.abi, provider);

        let counter = await target.counter();
        counter = counter.toNumber();
        console.log("Registered players so far:", counter);

        // let players = await target.players();
        // players = players.toNumber();
        // console.log("Final players:", players);  
        for (let i = 1; i < counter+1; i++) {
            let response = await target.getPlayersInformation(i);
            // console.log(response);
            const name = response[0];
            // console.log(name);
            let choice = response[1].toNumber();
            choice = convert(choice);
            // console.log(choice)
            const open = (response[2].toNumber())/100000000;
            // console.log(open)
            const close = response[3].toNumber()/100000000;
            // console.log(close)
            const range = response[4].toNumber()
            // console.log(range)
            const winner = response[5];

            const object = {
                name,
                choice,
                open,
                close,
                range,
                winner,
            }
            console.log(object)
            setResponse((x) => [...x, object])
        }
    }
    return (
        <div>
            <div className="rounded-t-md h-full w-full">
                <header className="bg-gray-800 text-white p-4 text-center rounded-t-md">
                    <h1 className="text-xl font-bold"> Registered Players</h1>
                </header>
                <div className='flex my-1 mx-1 text-white'>
                    <p className="w-1/5 text-center text-sm">Name</p>
                    <p className='w-1/5 text-center text-sm'>Choice</p>
                    <p className="w-1/5 text-center text-sm">Open</p>
                    <p className="w-1/5 text-center text-sm">Close</p>
                    <p className="w-1/5 text-center text-sm">Range</p>
                </div>
                {
                    response.map((x) => (
                        <div className={`flex py-2 my-1 mx-1 ${x.winner == true ? 'bg-sky-400' : 'bg-blue-100 hover:bg-blue-200'} border rounded-lg`} key={x.name}>
                            <p className='w-1/5 text-center text-xs'><b>{x.name}</b></p>     
                            <p className='w-1/5 text-center text-xs'><b>{x.choice}</b></p>      
                            <p className='w-1/5 text-center text-xs'>{x.open == 0 ? "-" : `${x.open}`}</p>                  
                            <p className='w-1/5 text-center text-xs'>{x.close == 0 ? "-" : `${x.close}`}</p>                  
                            <p className='w-1/5 text-center text-xs'>{x.range == 0 ? "-" : `${x.range}`}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}