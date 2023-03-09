# Charity donation tutorial project

This project is a training project to learn the Solidity smart contract language.

This documentation is meant to introduce various parts of the Ethereum ecosystem and its most common coding language, Solidity. You do not need to understand everything written here to be able to write smart contracts, but the more you understand the easier things get for you.

## Introduction to Solidity and the Ethereum Virtual Machine (EVM) environment

### Why introduce Solidity

Nowadays there are many different languages for writing smart contracts. Solidity is, [by far](https://blog.chain.link/smart-contract-programming-languages/), the most popular language. It was arguably the first language for writing smart contracts since it was the first language for the first smart contract platform Ethereum.

Because of its popularity, Solidity has good documentation and plenty of helpful articles around to help when stuck. Even [OpenAI](https://chat.openai.com/) understands and can help you with Solidity!

Therefore we feel that Solidity is the natural choice for an introductory language.

### Solidity & EVM in a nutshell

1. A (smart) contract is a program which is running in the blockchain
1. All interactions happen between addresses:
  1. There are two types of addresses: a user address (so called Externally Owned Address or EOA) and contract address
  1. An EOA address is generated from the user's private key. A private is generated randomly. So, to get an EOA, the user first generates a private key, which is then used to (deterministically) generate an EOA. This is also called a wallet or an account.
  1. Every deployed contract has a unique contract address. Interaction with the contract happens to that address.
1. An interaction is called a transaction. Any time an EOA wants to interact with another EOA or a contract, they issue a transaction.

### Ethereum assets

There are two types of assets in Ethereum. The main asset is the blockchain's native asset, called *Ether*. The other type is various user created assets, called tokens.

Ether is used for mainly two purposes: transfers of value (user or contract wants to transfer some asset of value to another user or contract) and for paying transaction costs. Transaction costs are explained in more detail below.

The other type, tokens, requires its own chapter.

#### Tokens

Any user, with enough Ether to pay for the transaction costs, can write and deploy any contract. Since contracts can store state they can be used as ledgers. Tokens are always regular smart contracts.

The most common token standard is the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token. The main element is a variable inside the contract which contains information about which address has which balance (this is the ledger). Furthermore, the token standard includes functions to change these balances by *transfers*. If the ledger says I have 5 tokens I can call the contract's transfer functionality to transfer those tokens to another address - this simply changes the numbers in the ledger, deducting from my balance and increasing the other address's balance.

Therefore tokens are regular smart contracts which follow certain token standards. Since every ERC-20 token follows the same standard, it is easy to integrate the tokens to various other contracts.

Another famous token standard is the [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) standard - more commonly known by its name Non-Fungible Token, or NFT.

Many tokens have real world value. Therefore they can be traded in various marketplaces and can be used to pay for various services.

### Transaction costs

Every transaction (including contract deployment) costs certain amount of *gas*. Gas is a unit for measuring computational complexity of operations. For example multiplying two values in a contract costs certain amount of gas, so the more operations (and more expensive operations) your transaction performs in a contract, the more gas the transaction requires.

When writing contracts one always has to consider the gas costs each line of code requires.

To pay for your transaction's gas costs you need to have Ethers in the wallet which issues the transaction. Ether is automatically used to pay for the gas costs. The eventual transaction cost depends not only on the transaction complexity, but also on the blockchain usage: the more usage the blockchain has the more you have to pay to get your transaction processed.

### Solidity development

Solidity has been inspired by JavaScript so its syntax should look somewhat familiar.

Solidity is a compiled language, so its source code is compiled into a bytecode version before deployment into a blockchain.

#### Immutability

All deployed contracts are immutable. That means once a contract is deployed, nobody can change its code. Furthermore, all contracts are permanent: once it's deployed it will stay in the blockchain forever.

However, contacts do have state, so their functionality can be changed by changing some variables. One just has to code all of the desired logic in advance: if variable *x* equals zero it should do this, but if it's greater than zero do something else.

There are ways to "bypass" the immutability by using proxy contracts, but that's out of the scope for this tutorial.

#### Development tools

There exist various tools that help in contract development. Every developer has their favourite set of tools.

Probably the most used development environment is Visual Studio Code. This project has a [default extension recommendation](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) from Hardhat (set in folder *.vscode*).

For quick and easy playground in the browser one can use [Remix](https://remix.ethereum.org/). It has good support for various tooling and some projects even use it for production code, but I wouldn't recommend that.

#### Deployment flow

Just having a ready source code (or bytecode) doesn't give you much - you also need to deploy it somewhere. You can think of deployment as similar to releasing a version of your traditional application, except that all blockchain deployments are permanent and immutable.

However, being permanent and immutable only refers to the blockchain in question. Nothing stops you from starting a new blockchain. And this is exactly what local development tools, including unit testing, do: they make it easy and fast to reset the blockchain state, essentially starting a new blockchain.

So when developing contracts on your local machine you can (and should) utilize local blockchains which are easy to reset. Development tooling mostly handles this automatically in the background, but if needed you can also run a local blockchain explicitly.

Once you are ready to deploy your code to some real blockchain, which can't be reset, you should start by deploying to some test network blockchain. Each EVM blockchain, such as Ethereum, has one or more testnets which are meant for testing. You can get testnet Ethers for free, which you can then use for deployments and transactions. Testnets are good especially for collaborative testing: doing manual tests which require multiple parties, since multiple parties can't utilize your local blockchain.

After testnet, the next logical step is deploying to mainnet.

#### User interfaces



#### Example project files and folder structure

Let's use this project to explain what different folders are used for and what the files are. Let's go through the folders alphabetically:
- Folder *.vscode*: contains settings used in Visual Studio Code. For example extension recommendations. This is created by the developer.
- Folder *artifacts*: contains compiled Solidity bytecodes for all of the used contracts. This is generated by Hardhat.
- Folder *assets*: contains images used in documentation. This is created by the developer.
- Folder *cache*: internal cache used by Hardhat. This is generated by Hardhat.
- Folder *contracts*: contains source code for all of the used contracts. This is the default folder name used by Hardhat, but can be configured. this is created by the developer.
- Folder *node_modules*: contains all of the used packages as listed in file *package.json*. This is generated by the package manager, NPM.
- Folder *scripts*: contains various scripts. Currently contains only the deployment script. This is created by the developer.
- Folder *test*: contains all of the unit tests. This is the default folder name used by Hardhat (for its unit test tooling), but can be configured. This is created by the developer.
- Folder *typechain-types*: contains TypeScript definitions for all of the used contracts. These can be used by your TypeScript code (unit tests and scripts mostly). This is generated by Hardhat.
- File *.env*: contains all of the secret information required by the project, such as the deployer's private key. This is created by the developer.
- File *.env.example*: contains a template for to be used as the *.env* file. This is created by the developer.
- File *.gitignore*: contains list of files/folders which are not added to version control. This is created by the developer.
- File *hardhat.config.ts*: contains settings for Hardhat. This is created by the developer.
- File *package-lock.json*: contains information about used packages. This is generated by the package manager, NPM.
- File *package.json*: contains information about the project and the packages it requires. This is created by the developer.
- File *README.md*: contains all of the documentation. This is created by the developer.
- File *tsconfig.json*: contains configuration for TypeScript. This is created by the developer.

#### Development pitfalls

As is the case with most modern coding languages, the language itself is not the difficult part to learn. Anyone can learn the language syntax and even most of the nuances.

The difficult part is understanding the environment in which the language is used. Since contracts are immutable it is not easy to fix possible issues - therefore the development lifycycle looks quite different than with traditional environments where often the business motto is "fail fast". If you fail fast with a blockchain smart contract you may lose millions in real assets. Security has to be your development priority.

Another common pitfall is the contract's gas usage. Nobody wants to pay too much for their transactions. In the worst case, the contract becomes bricked if it tries to use more gas than any blockchain block has space for.

## Example contract functionality

The contract presented in this repository (file *contracts/Voting.sol*) is a simple voting contract to distribute native assets sent to the contract. This is only created for learning purposes and is not meant to be used in real use.

The contract supports the following functionalities:
- A static list of voter addresses is provided to the contract upon deployment
- Voters can suggest a charity donation address
- Anyone can send the blockchain's native asset to the contract to donate to the target charity
- At some point the voters vote whether the gathered assets should be sent to the target charity or not
- If enough voters agree, the assets can be distributed to the charity

What is missing from this project:
- Resetting the vote state after the charity donation has been distributed
- Various supporting functionality, such a changing vote, withdrawing vote, abstain votes, ...

## Unit tests

Unit tests are small pieces of code which make sure certain specific functionality works in the smart contract. They help in making sure the contract works as intended, but also to help retain the desired functionality when changes are made to the contract.

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

## Read more

TODO

