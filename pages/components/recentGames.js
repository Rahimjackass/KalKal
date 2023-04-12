import HUB_ADDRESS from '../../config';
import Hub from "../../artifacts/contracts/Hub.sol/Hub.json";

const { ethers } = require('ethers');

export default function RecentGames () {

    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    const contractAbi = Hub.abi;
    // console.log("Contract Abi", Hub.abi);

    const contract = new ethers.Contract(HUB_ADDRESS, contractAbi, provider);
    // console.log("Contract", contract);
    // create an event filter
    // const eventName = 'gameCreated(uint256,uint256,address,address)';






    const handleClick = async () => {
        const blockNumber = await provider.getBlockNumber()
        console.log(blockNumber);

        const filter = {
            address: HUB_ADDRESS,
            fromBlock: blockNumber - 999,
            toBlock: blockNumber,
        };

        // get the event logs
        const logs = await provider.getLogs(filter);
        console.log("Logs:", logs);
        // decode the logs
        const decodedLogs = logs.map(log => contract.interface.parseLog(log));

        console.log("Players", (decodedLogs[0].args[0]).toNumber());
        console.log("Ticket Price", (decodedLogs[0].args[1]).toNumber(), "MATIC");

    }


    return (
        <div className="border rounded-md h-full mx-1 my-1">
            <header className="bg-gray-800 text-white p-4 text-center rounded-md">
                <h1 className="text-xl font-bold">Recent Created Games</h1>
                <button onClick={handleClick}>Bokon tush</button>
            </header>
        </div>
    )
}