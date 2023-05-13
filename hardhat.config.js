require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {
        version: "0.8.17",
      },
      {
        version: "0.8.6",
      }
    ],
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 6
      }
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    }
  }
};
