# Charity donation project

This project is a training project to learn the Solidity smart contract language.

## Introduction to Solidity and the Ethereum Virtual Machine (EVM) environment

### Why introduce Solidity

Nowadays there are many different languages for writing smart contracts. Solidity is, [by far](https://blog.chain.link/smart-contract-programming-languages/), the most popular language. It was arguably the first language for writing smart contracts since it was the first language for the first smart contract platform Ethereum.

Because of its popularity, Solidity has good documentation and plenty of helpful articles around to help when stuck. Even [OpenAI](https://chat.openai.com/) understands and can help you with Solidity!

Therefore we feel that Solidity is the natural choice for an introductory language.

### Solidity & EVM

1. A (smart) contract is a program which is running in the blockchain
1. All interactions happen between addresses:
  1. There are two types of addresses: a user address (so called Externally Owned Address or EOA) and contract address
  1. An EOA address is generated from the user's private key. A private is generated randomly. So, to get an EOA, the user first generates a private key, which is then used to (deterministically) generate an EOA. This is also called a wallet or an account.
  1. Every deployed contract has a unique contract address. Interaction with the contract happens to that address.
1. An interaction is called a transaction. Any time an EOA wants to interact with another EOA or a contract, they issue a transaction.
1. A contract is created by compiling a Solidity contract to a bytecode version and deploying that to the blockchain with a transaction.

## Contract functionality

The contract is a simple voting contract to distribute native assets sent to the contract. This is only created for learning purposes and is not meant to be used in real use.

The contract supports the following functionalities:
- A list of voter addresses is given upon contract deployment
- Voters can suggest a charity donation address
- Anyone can send the blockchain's native asset to the contract to donate to the target charity
- At some point the voters vote whether the gathered assets should be sent to the target charity or not
- If all voters agree, the assets can be distributed to the charity

What is missing from this project:
- Resetting the vote state after the charity donation has been distributed
- Various supporting functionality, such a changing vote, withdrawing vote, abstain votes, ...
- Deploying the contract to some real testnet, verifying the contract in a blockchain scanner (Etherscan). A verified contract would have an auto-generated UI to interact with it through Etherscan.

## Unit tests

The project contains comprehensive unit tests. The tests are written with Chai/Mocha JS test frameworks, with some Solidity-specific extensions.

## Used libraries and technologies

This project uses the following components:
- [Solidity](https://soliditylang.org/) language
- JavaScript, TypeScript
- [Hardhat](https://hardhat.org/) development environment
- Hardhat toolbox plugin, which includes the following notable packages:
  - [ethers.js](https://docs.ethers.org/v5/) Ethereum blockchain interaction library
  - [Mocka](https://mochajs.org/) and [Chai](https://chaijs.com/) JavaScript testing libraries
  - [Typechain](https://github.com/dethcrypto/TypeChain/) for creating TypeScript bindings for Solidity contracts

## Installation

1. If not installed, [install node](https://nodejs.org/en/download)
1. Open a terminal in the project's root folder
1. Run `npm i`
1. To run unit tests, run `npx hardhat test`

### Deployment

To deploy the contract to the Sepolia testnet, you should:

1. Have an account (a wallet) with enough Ether for deployment
  1. To create an account, you can use a browser wallet extension. [Metamask](https://metamask.io/) is one popular wallet extension. Once you have it installed, you can switch network to Sepolia and create a new account.
  1. To get free Ether in the Sepolia testnet, you need a faucet. You can for example run this faucet for a while: https://sepolia-faucet.pk910.de/ . It takes a while to 'generate' Ether in order to deter spam attacks. Do note that this is not a real Proof of Work protocol.
1. Create a new file called `.env` in the project root folder. You can just duplicate the file `.env.example` to have a ready template.
1. Export the account's private key. Metamask offers this possibility through the account settings. Add this private key to the `.env` file. This private key is used to sign deployment transactions - so this account will be the one deploying contracts (and paying for the deployment).
1. Go to https://etherscan.io and create an Etherscan account there. Create an API key, export it and add it to `.env`. This is used to verify contracts in the Etherscan blockchain explorer.
1. Go to https://alchemy.com and create an Alchemy account. Create a new app in the Sepolia network. Export its full HTTPS url and add it to `.env`. This is the blockchain connection provider you will use to connect to the blockchain.
1. Your `.env` file should now look like the image after these instructions.
1. Run command `npm run deploy` which executes a script `scripts/deploy.ts` for deployment and Etherscan verification.
1. It takes a bit more than a minute to deploy and verify, but once that's done the script should give you an address for the contract.

<img src="assets/env.png" alt="Contents of .env file"></img>


