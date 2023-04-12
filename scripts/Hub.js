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


  console.log("-------------------------------------------------------------------")
  let MyContract = await hre.ethers.getContractFactory("Hub");
  const HUB = await MyContract.deploy();

  await HUB.deployed();

  console.log("Hub contract deployed to:", HUB.address);

  // console.log("-------------------------------------------------------------------")
  // console.log("Now let's deploy a game contract by createGame function")

  // let response = await HUB.createGame(5, 10);
  // let receipt = await response.wait();

  // console.log("New game address:", receipt.events[0].args._newGame);
  // console.log("Players:", receipt.events[0].args._players);
  // console.log("Ticket price:", receipt.events[0].args._ticketPrice);
  // console.log("Address of deployer:", receipt.events[0].args._deployer);
}   

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
