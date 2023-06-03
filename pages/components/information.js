import { useContractRead } from "wagmi";
import { useRouter } from 'next/router';
import GameArtifact from "../../artifacts/contracts/Game.sol/Game.json";
import { useState } from "react";
import { ethers } from 'ethers';

export default function Information () {
    const router = useRouter();

    const { contract } = router.query;

    const [ balance, setBalance ] = useState(null)

    const [ ticketPrice,setticketPrice ] = useState(null)
    const [ period, setPeriod ] = useState(null)
    
    const [ counter, setCounter ] = useState(null)

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'ticketPrice',
        onSuccess(data) {
            console.log('Ticket:', data.toNumber())
            setticketPrice(data.toNumber())
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
        functionName: 'getBalance',
        onSuccess(data) {
            // console.log('Balance:', data.toNumber())
            setBalance(ethers.utils.formatEther(data))
        },
    })

    // useContractRead({
    //     address: contract,
    //     abi: GameArtifact.abi,
    //     functionName: 'counter',
    //     onSuccess(data) {
    //         console.log('Success', data.toNumber())
    //         setCounter(data.toNumber())
    //     },
    // })

    return (
        <div className='flex w-full'>
            {/* <div className="border w-1/3 text-center py-5"><h2>ticket: {ticketPrice} MATIC</h2></div>
            <div className="border w-1/3 text-center py-5"><h2>period: {period} seconds</h2></div> */}
            <div className="border border-t-0 border-l-0 w-1/3 text-center py-5 bg-teal-600">
                <p className="text-sm">period</p>
                <div className="flex items-center justify-center">
                    <p className="text-lg"><b>{period}</b></p>
                    <p className="text-xs pl-1">seconds</p>
                </div>
            </div>
            <div className="border border-t-0 w-1/3 text-center py-5 bg-teal-600">
                <p className="text-sm">ticket</p>
                <div className="flex items-center justify-center">
                    <p className="text-lg"><b>{ticketPrice}</b></p>
                    <p className="text-xs pl-1">MATIC</p>
                </div>
            </div>
            <div className="border border-t-0 border-r-0 w-1/3 text-center py-5 bg-teal-600">
                <p className="text-sm">balance</p>
                <div className="flex items-center justify-center">
                    <p className="text-lg"><b>{balance}</b></p>
                    <p className="text-xs pl-1">MATIC</p>
                </div>
            </div>

            {/* <h2>You contract: {contract}</h2> */}
            
            {/* <h2>Players: {players}</h2> */}
            
            {/* <h2>{counter} people have participated so far</h2> */}
        </div>
    )
}