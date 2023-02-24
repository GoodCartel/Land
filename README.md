# Charity donation project

This project is a training project to learn Solidity smart contract language.

## Contract functionality

The contract supports the following functionalities:
- A list of voter addresses is given upon contract deployment
- Voters can suggest a charity donation address
- Anyone can send the blockchain's native asset to the contract to donate to the target charity
- At some point the voters vote whether the gathered assets should be sent to the target charity or not
- If all voters agree, the assets can be distributed to the charity

What is missing from the contract:
- Resetting the vote state after the charity donation has been distributed
- Various supporting functionality, such a changing vote, withdrawing vote, abstain votes, ...

## Unit tests

The project contains comprehensive unit tests.

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