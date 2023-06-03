// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

async function main() {
  console.log("Hello Boss")
  console.log("What a great day to have a great day <3")
  console.log("Let's get to our work...")
  console.log("Getting accounts...")
  const [account1, account2, account3, account4, account5, account6 ] = await ethers.getSigners();
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

  console.log("account4", account4.address)
  console.log(`Balance of account4: ${ethers.utils.formatEther(await account4.getBalance()).slice(0, 4)}MATIC`);

  console.log("-------------------------------------------------------------------")

  console.log("account5", account5.address)
  console.log(`Balance of account5: ${ethers.utils.formatEther(await account5.getBalance()).slice(0, 4)}MATIC`);

  console.log("-------------------------------------------------------------------")

  console.log("account6", account6.address)
  console.log(`Balance of account6: ${ethers.utils.formatEther(await account6.getBalance()).slice(0, 4)}MATIC`);

  console.log("-------------------------------------------------------------------")
  let MyContract = await hre.ethers.getContractFactory("PriceFeed");
  const PRICEFEED = await MyContract.deploy();

  await PRICEFEED.deployed();

  console.log("PriceFeed deployed to:", PRICEFEED.address);
  console.log("-------------------------------------------------------------------");
  MyContract = await hre.ethers.getContractFactory("Game");
  const GAME = await MyContract.deploy(PRICEFEED.address, account1.address, "Ferdoosipoor", ethers.utils.parseEther("20"), 200);

  await GAME.deployed();

  console.log("Game deployed to:", GAME.address);
  // console.log("-------------------------------------------------------------------");
  // console.log("Trying to register six players...")
  // let response = await GAME.counter()
  // console.log("Registered players so far :", response.toNumber())
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Sina", 0);
  // await response.wait()
  // console.log("Sina registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Erfan", 3);
  // await response.wait()
  // console.log("Erfan registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Salar", 2);
  // await response.wait()
  // console.log("Salar registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Amin", 1);
  // await response.wait()
  // console.log("Amin registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Kami", 5);
  // await response.wait()
  // console.log("Kami registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Sami", 0);
  // await response.wait()
  // console.log("Sami registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Parmis", 5);
  // await response.wait()
  // console.log("Ostad registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Hashari", 2);
  // await response.wait()
  // console.log("Namjoo registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Asal", 5);
  // await response.wait()
  // console.log("Asal registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Jigar", 4);
  // await response.wait()
  // console.log("Jigar registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.takePart("Rozmehr", 0);
  // await response.wait()
  // console.log("Rozita registered successfully")
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counter()
  // console.log("Registered players so far:", response.toNumber())
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.paused()
  // console.log("Game paused?", response);
  // console.log("-------------------------------------------------------------------")
  // console.log("Starting the game...")
  // response = await GAME.startGame()
  // await response.wait()
  // console.log("Game just started");
  // response = await GAME.paused()
  // console.log("Game is paused?", response);
  // console.log("-------------------------------------------------------------------")
  // console.log("Getting open prices for all players...");
  // let counter = await GAME.counter();
  // counter = counter.toNumber()
  // console.log("Number of registered players so far:", counter);

  // for (let i=1; i < counter+1; i++) {
  //   response = await GAME.counterToPlayer(i);
  //   console.log(response.name, "Open Price:", response.open.toNumber());
  // }
  // console.log("-------------------------------------------------------------------")
  // console.log("Waiting for 2 minutes before ending the game...")
  // await new Promise(resolve => setTimeout(resolve, 120000));
  // console.log("Now let's end the game and see the results")
  // console.log("Finishing the game...");
  // response = await GAME.endGame({ gasLimit: 5000000 })
  // await response.wait();
  // console.log("Game ended")
  // console.log("-------------------------------------------------------------------")
  // console.log("Getting players information...")
  // for (let i=1; i < counter+1; i++) {
  //   response = await GAME.counterToPlayer(i);
  //   console.log(response.name, "\n Choice:", response.choice.toNumber(), "\n Range:", response.range.toNumber(), "\n Winner:", response.winner ? "Yes" : "No");
  //   console.log("-------------------------------------------------------------------")
  // }
  // // response = await GAME.winners();
  // // console.log(`We have ${response.toNumber()} winners`);
  // // console.log("Getting information around picked coins...");
  // response =  await GAME.winnerChoice();
  // console.log("The winner choice is:", response.toNumber())

  // response = await GAME.winners()
  // console.log("The number of winners is:", response.toNumber());



  // console.log("-------------------------------------------------------------------")
  // console.log("Checking players information...");
  // response = await GAME.counterToPlayer(1)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(2)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(3)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(4)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(5)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(6)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open);
  // console.log("-------------------------------------------------------------------")

  // console.log("Game finished!")
  // console.log("-------------------------------------------------------------------")
  // console.log("Checking players information again after finishing the game...");
  // response = await GAME.counterToPlayer(1)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(2)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(3)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(4)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(5)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(6)
  // console.log("Player:", response.name, "Choice:", response.choice.toNumber(), "\nOpen Price:", response.open, "\nClose Price:", response.close, "\nRange:", response.range.toNumber().toFixed(6));
  // console.log("Now let's check close prices...")
  // console.log("Checking players information");
  // response = await GAME.counterToPlayer(1)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(2)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(3)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(4)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(5)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.counterToPlayer(6)
  // console.log("Player:", response.name, "Choice:", response.choice, "\nOpen Price:", response.open, "\nClose Price", response.close);
  // console.log("-------------------------------------------------------------------")
  // response = await GAME.paused()
  // console.log("Game paused?", response);
  // console.log("Let's see who has won the game...")
  // response = await GAME.winnerName();
  // console.log("The winner is", response);
  // console.log("-------------------------------------------------------------------")
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });