## What is Solidity

Solidity is the original programming language for developing smart contracts for the Ethereum ecosystem. It has been inspired by JavaScript, so its syntax should look somewhat familiar for developers.

Solidity is a high-level language and has lots of features familiar from other high-level languages. But since it is also a language for writing blockchain smart contracts, it has some unique extra features.

Before a Solidity contract can be used in a real blockchain environment, it needs to be compiled into a bytecode version. 

### Why introduce Solidity

Nowadays there are many different languages for writing smart contracts. Solidity is, [by far](https://blog.chain.link/smart-contract-programming-languages/), the most popular language. It was arguably the first language for writing smart contracts since it was the first language for the first smart contract platform, Ethereum.

Because of its popularity, Solidity has good documentation and plenty of helpful articles around to help when stuck. Even [OpenAI](https://chat.openai.com/) understands and can help you with Solidity!

Therefore, we feel that Solidity is the natural choice for an introductory language.

### Solidity development

#### Immutability

All deployed contracts are immutable. That means once a contract is deployed, nobody can change its code. Furthermore, all contracts are permanent: once it's deployed, it will stay in the blockchain forever.

However, contracts do have state, so their functionality can be changed by changing some variables. One just has to code all the desired logic in advance: if variable *x* equals zero it should do this, but if it's greater than zero do something else.

There are ways to "bypass" the immutability by using proxy contracts, but that's out of the scope for this tutorial.

#### Development tools

There exist various tools that help in contract development. Every developer has their favourite set of tools.

Probably the most used development environment is Visual Studio Code. This project has a [default extension recommendation](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) from Hardhat (set in folder *.vscode*).

For quick and easy playground in the browser, one can use [Remix](https://remix.ethereum.org/). It has good support for various tooling and some projects even use it for production code, but that's not recommended.

## What is Ethereum and the Ethereum Virtual Machine (EVM)

### What is Ethereum

Ethereum is a blockchain launched in 2015. It uses similar blockchain principles as Bitcoin, but also introduces fully programmable smart contracts.

### What is the Ethereum Virtual Machine (EVM)

The Ethereum Virtual Machine is an abstract computer which manages all the logic and consensus of the blockchain. It's the backbone of all the blockchain's operations: all addresses, contracts and state transitions are stored in the EVM.

The EVM is built by thousands of individual computers which participate in upholding the EVM's rules. Each one of these computers runs a *node client*, a program which knows the rules of the network and communicates with other node clients to propagate information, and to agree on the current blockchain's state.

## Tokens, transactions and costs

### Addresses

All interactions inside the Ethereum blockchain happen between blockchain addresses. An address is a 40 character hexadecimal string (such as *0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D*).

There are two types of addresses:
1. A user address. Also called an Externally Owned Address or EOA.
1. A contract address.

An EOA address is generated from the user's private key. A private key is generated randomly. So, to get an EOA, the user first generates a private key, which is then used to (deterministically) generate an EOA. This is also called a wallet or an account.

Every deployed contract has a unique contract address. Interaction with the contract happens to that address.

### Transactions

Any interaction which changes state in the blockchain is called a transaction. Any time an EOA wants to interact with another EOA or a contract, they issue a transaction. Transactions are always issued by EOAs, so contracts can't issue transactions by themselves. Therefore, contracts can't also do anything on their own - all actions performed by contracts are always triggered by a transaction from an EOA.

It is possible to read data from the blockchain without a transaction. This kind of interaction only reads the data from the node you are connecting to, since all nodes contain the blockchain's current state. This kind of read-only interactions can't, obviously, change the state of the blockchain in any way.

### Networks

There are generally three kinds of (EVM) blockchain networks:

1. Public mainnet networks where assets have real value. Such as Ethereum or Polygon
1. Public testnet networks where assets don't have any real value. Such as Ethereum Sepolia or Polygon Mumbai
1. Local private networks where assets don't have any real value. Every developer deployes their own in their own computers. Used for local testing. The networks are very short-lived and don't have any names.

Mainnet is the production environment. Testnets are handy for distributing your contracts to be tested by other team members. Local networks are for short-lived, personal testing.

### Ethereum assets

There are two types of assets in Ethereum. The main asset is the blockchain's native asset, called *Ether*. The other type is various user created assets, called tokens.

Ether is used for mainly two purposes: transfers of value (user or contract wants to transfer some asset of value to another user or contract) and for paying transaction costs. Transaction costs are explained below.

The other type, tokens, requires its own chapter and is explained a bit later.

### Transaction costs

Every transaction (including contract deployment) costs certain amount of *gas*. Gas is a unit for measuring computational complexity of operations. For example, multiplying two values in a contract costs a certain amount of gas, so the more operations (and more complex operations) your transaction performs in a contract, the more gas the transaction requires.

When writing contracts, one always has to consider the gas costs of each line of code.

To pay for your transaction's gas costs, you need to have Ethers in the wallet which issues the transaction. Ether is automatically used to pay for the gas costs. The eventual transaction cost depends not only on the transaction complexity, but also on the blockchain usage: the more usage the blockchain has, the more you have to pay to get your transaction processed.

Read-only interactions do not consume gas and are therefore free.

### Tokens

Any user, with enough Ether to pay for the transaction costs, can write and deploy any contract. Since contracts can store state, they can be used as ledgers. Tokens are always regular smart contracts.

The most common token standard is the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token. The main element is a variable inside the contract which contains information about which address has which balance (this is the ledger). Furthermore, the token standard includes functions to change these balances by *transfers*. If the ledger says I have 5 tokens I can call the contract's transfer functionality to transfer those tokens to another address - this simply changes the numbers in the ledger, deducting from my balance and increasing the other address's balance.

Therefore, tokens are regular smart contracts which follow certain token standards. Since every ERC-20 token follows the same standard, it is easy to integrate the tokens to various other contracts.

Another famous token standard is the [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) standard - more commonly known by its name Non-Fungible Token, or NFT.

Many tokens have real world value. Therefore, they can be traded in various marketplaces and can be used to pay for various services.

## Pitfalls, Security and audits

### Development pitfalls

As is the case with most modern coding languages, the language itself is not the difficult part to learn. Anyone can learn the language syntax and even most of the nuances.

The difficult part is understanding the environment in which the language is used. Since contracts are immutable it is not easy to fix possible issues - therefore the development lifecycle looks quite different than with traditional environments where often the business motto is "fail fast". If you fail fast with a blockchain smart contract, you may lose millions in real assets. Security has to be your development priority.

Another common pitfall is the contract's gas usage. Nobody wants to pay too much for their transactions. In the worst case, the contract becomes bricked if it tries to use more gas than any blockchain block has space for.

### Contract security

All programs have bugs. Smart contracts are no exception.

Bugs in smart contracts are a lot more serious for a few reasons:
1. Since contracts are immutable, there's no easy way to fix a bug
1. A contract may hold valuable assets. A bug may expose those to an attacker
1. The attack vectors are quite different compared to regular programs, which means specials skills and/or tools are required to identify security issues

### Security audits

Once a smart contract's code is ready, it is usually given to some auditing company for an audit.

These specialized auditing companies go through the contract code to try to identify security issues. They use a lot of static tooling, but the most important part is manually analyzing the contract. There is currently no real substitute for an expert human to manually go through the contract and report findings.

Once an audit is complete, a report is published and possible issues found in it are corrected. After that, big projects may start another audit with another company, or simply deem the contract ready for production and deploy it.

### Bug bounties

Since contract code is usually open sourced, anyone can go through it to find security issues. A special bug bounty program is sometimes issued where the contract team can pay a million dollars or [even more](https://assets.ctfassets.net/t3wqy70tc3bv/6Tqb2wlVnwdGYeVZX4WDmU/6b0c222b4f680ac80ea801e032894eac/Immunefi_Crypto_Bug_Bounty_and_Ransom_Payments_Report.pdf) for found critical issues.

