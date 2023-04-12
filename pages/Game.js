import { useRouter } from 'next/router';
import Dropdown from './components/dropdown';
import 'tailwindcss/tailwind.css';

import { useContractRead } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';

import GameArtifact from "../artifacts/contracts/Game.sol/Game.json";

export default function Game () {
    const router = useRouter();
    const { contract } = router.query;

    const { data: players } = useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'players',
    })
    
    const { data: ticket } = useContractRead({
        address: contract,
        abi: GameArtifact.abi,
        functionName: 'ticketPrice',
    })

    // console.log(contract);
    // console.log(players.toNumber());
    // console.log(ethers.utils.formatEther(ticket));

    return (

        <div className="h-full bg-gradient-to-b from-rose-400 to-violet-900">
            <header className="bg-gray-800 text-white p-4">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold ml-5">KalKal</h1>
                    <ConnectButton></ConnectButton>
                </div>
            </header>
            <div className="flex">
                <div className="w-1/3 h-screen border rounded-md mr-0.5">

                </div>
                <div className="w-2/3 h-screen border rounded-md ml-0.5">

                </div>
            </div>
        </div>
  
    )
}