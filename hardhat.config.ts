import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//this will help you to verify your address on Etherscan
require("@nomiclabs/hardhat-etherscan");

const dotenv = require('dotenv');
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
//@dev - pass the network properties

const config: HardhatUserConfig = {
   solidity: "0.8.9",

   networks: {
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};
export default config;
