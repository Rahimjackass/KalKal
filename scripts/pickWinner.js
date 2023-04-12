// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    console.log("Hello Boss, you are great!")
    console.log("Let's get to our work...")
    console.log("Initializing the game...")
    const [account1, account2, account3] = await ethers.getSigners();

    MyContract = await hre.ethers.getContractFactory("Game");
    const GAME = await MyContract.deploy(3);

    await GAME.deployed();

    console.log("Game contract deployed to:", GAME.address);

    console.log("-------------------------------------------------------------------")
    console.log("Trying to register players...")
    let response = await GAME.counter()
    console.log("Initial Value of Counter :", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account1).takePart("Sina", 1, 100, 142, {value: ethers.utils.parseEther("0.01")});
    await response.wait()
    console.log("Sina registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account2).takePart("Erfan", 2, 100, 141, {value: ethers.utils.parseEther("0.01")});
    await response.wait()
    console.log("Erfan registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account3).takePart("Salar", 3, 100, 143, {value: ethers.utils.parseEther("0.01")});
    await response.wait()
    console.log("Salar registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------")
    console.log("Getting players information...");
    response = await GAME.counterToPlayer(1)
    // console.log("First user information...")
    console.log(response[0], response[1], response[2], response[3], response[4]);
    response = await GAME.counterToPlayer(2)
    // console.log("Second user information...")
    console.log(response[0], response[1], response[2], response[3], response[4]);
    response = await GAME.counterToPlayer(3)
    // console.log("Third user information...")
    console.log(response[0],response[1], response[2], response[3], response[4]);
    console.log("-------------------------------------------------------------------")
    response = await GAME.calculateRange()
    await response.wait();
    console.log("Players information after range calculation...");

    response = await GAME.counterToPlayer(1)
    console.log(response[0], response[5]);

    response = await GAME.counterToPlayer(2)
    console.log(response[0], response[5]);

    response = await GAME.counterToPlayer(3)
    console.log(response[0], response[5]);
    console.log("-------------------------------------------------------------------")
    console.log("Running pickWinner function...")
    response = await GAME.pickWinner()
    await response.wait()
    console.log("Done!")
    console.log("-------------------------------------------------------------------")
    console.log("Getting winner information");
    // response = await GAME.winnerRange()
    // const winnerRange = response.toNumber()

    response = await GAME.winnerName()
    const winnerName = response
    console.log("Hoorraaaaa!!!")
    console.log(`The winner is ${winnerName}`)
    // response = await GAME.winner()
    // console.log(winner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
