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

## Installation

- If not installed, (install node)[https://nodejs.org/en/download/]
- Run `npm i`
- To run unit tests, run `npx hardhat test`