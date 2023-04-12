// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log("Hello Boss")
  console.log("You are great!")
  console.log("Let's get to our work...")
  console.log("Getting accounts...")
  const [account1, account2, account3 ] = await ethers.getSigners()
  console.log("-------------------------------------------------------------------")

  console.log("account1", account1.address)
  console.log(`Balance of account1: ${ethers.utils.formatEther(await account1.getBalance()).slice(0, 4)}MATIC`);
  console.log("-------------------------------------------------------------------")

  console.log("account2", account2.address)
  console.log(`Balance of account2: ${ethers.utils.formatEther(await account2.getBalance()).slice(0, 4)}MATIC`);
  console.log("-------------------------------------------------------------------")

  console.log("account3", account3.address)
  console.log(`Balance of account3: ${ethers.utils.formatEther(await account3.getBalance()).slice(0, 4)}MATIC`);

  console.log("-------------------------------------------------------------------")
  let MyContract = await hre.ethers.getContractFactory("Bitcoin");
  const BTC = await MyContract.deploy();

  await BTC.deployed();

  console.log("Bitcoin contract deployed to:", BTC.address);
  console.log("-------------------------------------------------------------------")
  MyContract = await hre.ethers.getContractFactory("Ethereum");
  const ETH = await MyContract.deploy();

  await ETH.deployed();

  console.log("Ethereum contract deployed to:", ETH.address);
  //-------------------------------------------------------------------
  // MyContract = await hre.ethers.getContractFactory("Link");
  // const LINK = await MyContract.deploy();

  // await LINK.deployed();

  // console.log("Link contract deployed to:", LINK.address);
  // //-------------------------------------------------------------------
  // MyContract = await hre.ethers.getContractFactory("Matic");
  // const MATIC = await MyContract.deploy();

  // await MATIC.deployed();

  // console.log("Matic contract deployed to:", MATIC.address);
  // //-------------------------------------------------------------------
  // MyContract = await hre.ethers.getContractFactory("Sand");
  // const SAND = await MyContract.deploy();

  // await SAND.deployed();

  // console.log("Matic contract deployed to:", SAND.address);
  console.log("-------------------------------------------------------------------")
  MyContract = await hre.ethers.getContractFactory("Solana");
  const SOL = await MyContract.deploy();

  await SOL.deployed();

  console.log("Solana contract deployed to:", SOL.address);
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  // console.log("Fetching BTC price...")
  // let response = await BTC.getLatestPrice()
  // console.log("BTC:", response.toNumber());

  // console.log("Fetching ETH price...")
  // response = await ETH.getLatestPrice()
  // console.log("ETH:", response.toNumber())

  // console.log("Fetching LINK price...")
  // response = await LINK.getLatestPrice()
  // console.log("LINK:", response.toNumber())

  // console.log("Fetching MATIC price...")
  // response = await MATIC.getLatestPrice()
  // console.log("MATIC:", response.toNumber())

  // console.log("Fetching SAND price...")
  // response = await SAND.getLatestPrice()
  // console.log("SAND:", response.toNumber())

  // console.log("Fetching SOL price...")
  // response = await SOL.getLatestPrice()
  // console.log("SOL:", response.toNumber())
  console.log("-------------------------------------------------------------------")
  console.log("Initializing the game...")
  MyContract = await hre.ethers.getContractFactory("Game");
  const GAME = await MyContract.deploy(3, BTC.address, ETH.address, SOL.address);

  await GAME.deployed();

  console.log("Game contract deployed to:", GAME.address);
  console.log("-------------------------------------------------------------------")
  console.log("Trying to register in the game with three different players...")
  let response = await GAME.counter()
  console.log("Initial Value of Counter :", response.toNumber())
  console.log("-------------------------------------------------------------------")
  response = await GAME.connect(account1).takePart("Sina", 1, {value: ethers.utils.parseEther("0.01")});
  await response.wait()
  console.log("Sina registered successfully")
  response = await GAME.counter()
  console.log("Counter Value:", response.toNumber())
  console.log("-------------------------------------------------------------------")
  response = await GAME.connect(account2).takePart("Erfan", 2, {value: ethers.utils.parseEther("0.01")});
  await response.wait()
  console.log("Erfan registered successfully")
  response = await GAME.counter()
  console.log("Counter Value:", response.toNumber())
  console.log("-------------------------------------------------------------------")

  response = await GAME.connect(account3).takePart("Salar", 3, {value: ethers.utils.parseEther("0.01")});
  await response.wait()
  console.log("Salar registered successfully")
  response = await GAME.counter()
  console.log("Counter Value:", response.toNumber())
  console.log("-------------------------------------------------------------------")
  console.log("Making sure three players are registered in the game...")
  console.log("Getting players information...");
  response = await GAME.counterToPlayer(1)
  // console.log("First user information...")
  console.log(response[0], response[1], response[2]);
  response = await GAME.counterToPlayer(2)
  // console.log("Second user information...")
  console.log(response[0], response[1], response[2]);
  response = await GAME.counterToPlayer(3)
  // console.log("Third user information...")
  console.log(response[0], response[1], response[2]);
  console.log("-------------------------------------------------------------------")
  console.log("Getting balance of the smart contract...")
  response = await GAME.getBalance();
  console.log("Balance:",ethers.utils.formatEther(response)," MATIC");
  console.log("-------------------------------------------------------------------")
  console.log("Executing start function...")
  response = await GAME.start()
  await response.wait()
  console.log("-------------------------------------------------------------------")
  console.log("Getting start price for each user...");
  response = await GAME.counterToPlayer(1)
  console.log(response[0],"-->", response[3]);

  response = await GAME.counterToPlayer(2)
  console.log(response[0],"-->", response[3]);

  response = await GAME.counterToPlayer(3)
  console.log(response[0],"-->", response[3]);
  console.log("-------------------------------------------------------------------")
  console.log("Now it's time to execute close function...")
  response = await GAME.close();
  await response.wait();
  console.log("-------------------------------------------------------------------")
  console.log("Getting player information after close function...");
  console.log("-------------------------------------------------------------------")
  response = await GAME.counterToPlayer(1)
  console.log(response[0],"START:", response[3], "CLOSE:",response[4]);
  console.log("-------------------------------------------------------------------")
  response = await GAME.counterToPlayer(2)
  console.log(response[0],"START:", response[3], "CLOSE:",response[4]);
  console.log("-------------------------------------------------------------------")
  response = await GAME.counterToPlayer(3)
  console.log(response[0],"START:", response[3], "CLOSE:",response[4]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
