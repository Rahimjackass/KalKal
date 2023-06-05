import { useRouter } from 'next/router';
import GameArtifact from "../../artifacts/contracts/Game.sol/Game.json";
import { useState } from "react";
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useContractEvent, useContractRead, useAccount } from 'wagmi';

export default function Information ({paused, winners}) {
    const router = useRouter();

    const { contract } = router.query;

    const [ balance, setBalance ] = useState(null)

    const [ ticketPrice,setticketPrice ] = useState(null)
    const [ period, setPeriod ] = useState(null)
    

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
            console.log('Balance:', ethers.utils.formatEther(data))
            setBalance(ethers.utils.formatEther(data))
        },
    })

    // useContractRead({
    //     address: contract,
    //     abi: GameArtifact.abi,
    //     functionName: 'winners',
    //     onSuccess(data) {
    //         console.log('Winners:', data.toNumber())
    //         setWinners(data.toNumber())
    //     },
    // })
    // const { config: startConfig, error: startError } = usePrepareContractWrite({
    //     address: contract,
    //     abi: GameArtifact.abi,
    //     functionName: 'startGame',
    //     onError(error) {
    //         console.log('Error Happened', error)
    //     },
    //     // onSuccess(data) {
    //     //     console.log('startGame function prepared!', data)
    //     // }
    // })
    

    // const { data: startData, isLoading: startLoading, isSuccess: startSuccess, write: startWrite } = useContractWrite({
    //     ...startConfig,
    //     onError(error) {
    //         console.log('Error Happened!', error)
    //     }, 
    //     onSuccess(success) {
    //         console.log('Game Started!', success)
    //     },
    //     onSettled(response) {
    //         console.log("Transaction Receipt:", response)
    //         setTimeout(() => {
    //             location.reload();
    //         }, 10000)
    //     }
    // })

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
        <div className='flex-col'>
            <div className="flex">
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
            </div>
            {/* <div className="w-full text-center py-5 bg-teal-600"> */}
        </div>
    )
}