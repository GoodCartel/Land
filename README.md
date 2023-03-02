# Charity donation project

This project is a training project to learn the Solidity smart contract language.

## Introduction to Solidity and the Ethereum Virtual Machine (EVM) environment

1. A (smart) contract is a program which is running in the blockchain
1. All interactions happen between addresses:
  1. There are two types of addresses: a user address (so called Externally Owned Address or EOA) and contract address
  1. An EOA address is generated from the user's private key. A private is generated randomly. So, to get an EOA, the user first generates a private key, which is then used to (deterministically) generate an EOA.
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

- If not installed, [install node](https://nodejs.org/en/download)
- Run `npm i`
- To run unit tests, run `npx hardhat test`