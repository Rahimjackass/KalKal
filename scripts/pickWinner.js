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
    const [account1, account2, account3, account4, account5, account6, account7] = await ethers.getSigners();

    console.log("-------------------------------------------------------------------")
    console.log("Deploying Pricefeed...");
    let MyContract = await hre.ethers.getContractFactory("PriceFeed");
    const PRICEFEED = await MyContract.deploy();
  
    await PRICEFEED.deployed();
  
    console.log("PriceFeed deployed to:", PRICEFEED.address);
    console.log("-------------------------------------------------------------------")
    MyContract = await hre.ethers.getContractFactory("Game");
    const GAME = await MyContract.deploy(PRICEFEED.address, account1.address, "Naser", ethers.utils.parseEther("1"), 200);

    await GAME.deployed();

    console.log("Game contract deployed to:", GAME.address);

    console.log("-------------------------------------------------------------------")
    console.log("Trying to register players...")
    let response = await GAME.counter()
    console.log("Initial value of counter :", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account1).takePart("Sina", 0, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Sina registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account2).takePart("Erfan", 1, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Erfan registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------")
    response = await GAME.connect(account3).takePart("Nic", 2, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Nic registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------");
    response = await GAME.connect(account4).takePart("Erza", 3, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Erza registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------");
    response = await GAME.connect(account5).takePart("Shahram", 2, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Shahram registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------");
    response = await GAME.connect(account6).takePart("Sadaf", 2, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Sadaf registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------");
    response = await GAME.connect(account7).takePart("Sotun", 1, {value: ethers.utils.parseEther("1")});
    await response.wait()
    console.log("Sina registered successfully")
    response = await GAME.counter()
    console.log("Counter Value:", response.toNumber())
    console.log("-------------------------------------------------------------------");
    console.log("Checking the game situation...")
    response = await GAME.paused();
    console.log(`The game is ${reponse=true ? "Paused" : "Ongoing"}`);
    console.log("-------------------------------------------------------------------");
    console.log("Starting the game...")
    response = await GAME.connect(account1).startGame();
    await response.wait()
    console.log("Game started!")
    console.log("-------------------------------------------------------------------");
    console.log("Getting players information...");
    response = await GAME.getPlayersInformation(1)
    console.log("-------------------------------------------------------------------");
    // console.log("First user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(2)
    // console.log("Second user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(3)
    // console.log("Third user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(4)
    // console.log("Third user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(5)
    // console.log("Third user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(6)
    // console.log("Third user information...")
    console.log("Name:", response[0], "\n Choice", response[1].toNumber(), "\n Open", response[2].toNumber());
    console.log("-------------------------------------------------------------------");
    console.log("Checking balance of the game...")
    response = await GAME.getBalance()
    console.log(`The game has ${ethers.utils.formatEther(response)} Matic`)
    console.log("-------------------------------------------------------------------");
    console.log("Waiting 2 minutes before ending the game...")
    await new Promise((resolve) => setTimeout(resolve, 120000));
    console.log("2 minutes is done! Let's close the game");
    response = await GAME.endGame({ gasLimit: 5000000 });
    await response.wait();
    console.log("The game just finished")
    console.log("-------------------------------------------------------------------");
    console.log("Checking the game situation...")
    response = await GAME.paused();
    console.log(`The game is ${response = true ? "Paused" : "Ongoing"}`);
    console.log("-------------------------------------------------------------------");
    console.log("Checking balance of the game...")
    response = await GAME.getBalance()
    console.log(`The game has ${ethers.utils.formatEther(response)} Matic`)
    console.log("-------------------------------------------------------------------");
    console.log("Checking number of winner...")
    response = await GAME.winners();
    console.log(`The game ended up with ${response.toNumber()} winners`);
    console.log("-------------------------------------------------------------------");
    console.log("Checking the winner choice...")
    response = await GAME.winnerChoice();
    console.log(`The winner choice is ${response.toNumber()}`);
    console.log("-------------------------------------------------------------------");
    console.log("Getting players information...");
    response = await GAME.getPlayersInformation(1)
    // console.log("First user information...")
    console.log("Name:", response[0], "\n Range", response[4].toNumber(), "\n Winner", response[5]);
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(2)
    // console.log("Second user information...")
    console.log("Name:", response[0], "\n Range", response[4].toNumber(), "\n Winner", response[5]);
    console.log("-------------------------------------------------------------------");
    response = await GAME.getPlayersInformation(3)
    // console.log("Third user information...")
    console.log("Name:", response[0], "\n Range", response[4].toNumber(), "\n Winner", response[5]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
