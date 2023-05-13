import { useContractRead } from "wagmi";
import { useRouter } from 'next/router';
import GameArtifact from "../../artifacts/contracts/Game.sol/Game.json";
import { useState } from "react";

export default function Information () {
    const router = useRouter();

    const { contract } = router.query;

    const [ players, setPlayers ] = useState(null)
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
        functionName: 'players',
        onSuccess(data) {
            console.log('Players:', data.toNumber())
            setPlayers(data.toNumber())
        },
    })

    useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'counter',
        onSuccess(data) {
            console.log('Success', data.toNumber())
            setCounter(data.toNumber())
        },
    })

    return (
        <div className='border '>
            <h2>You contract: {contract}</h2>
            <h2>Ticket Price: {ticketPrice} MATIC</h2>
            <h2>Period: {period} seconds</h2>
            <h2>Players: {players}</h2>
            <h2>Total Balance of the contract:</h2>
            <h2>{counter} people have participated so far</h2>
        </div>
    )
}