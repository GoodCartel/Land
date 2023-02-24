import { ethers } from "hardhat";

async function main() {
  const signers = await ethers.getSigners();

  const voter1 = signers[0];
  const voter2 = signers[1];
  const voter3 = signers[2];

  let voters = [voter1.address, voter2.address, voter3.address];

  const VotingFactory = await ethers.getContractFactory("Voting");
  const votingContract = await VotingFactory.connect(signers[0]).deploy(voters);

  await votingContract.deployed();

  console.log(`Contract deployed to ${votingContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
