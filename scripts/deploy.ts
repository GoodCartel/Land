import { ethers } from "hardhat";
import hre from "hardhat";

// This is an example deployment script. 
// You can use this to deploy to any network, but the project is not configured to access any real networks currently.

const verify = async (addr: string, args: any[]) => {
  try {
    await hre.run("verify:verify", {
      address: addr,
      constructorArguments: args,
    });
  } catch (ex: any) {
    if (ex.toString().indexOf("Already Verified") == -1) {
      throw ex;
    }
  }
};

async function main() {
  const signers = await ethers.getSigners();

  const voter1 = signers[0].address; // Address based on the deployer's private key
  const voter2 = "0xd0F723c6b2226dF56Fe41E63b9eAA66Eb540BcB8"; // Alice's public address
  const voter3 = "0x0d731cfabC5574329823F26d488416451d2ea376"; // Bob's public address

  let voters = [voter1, voter2, voter3];

  const VotingFactory = await ethers.getContractFactory("Voting");
  const votingContract = await VotingFactory.connect(signers[0]).deploy(voters);

  await votingContract.deployed();

  console.log("Deployments done, waiting for etherscan verifications");
  // Wait for the contract to be propagated inside Etherscan
  await new Promise((f) => setTimeout(f, 60000));
  await verify(votingContract.address, [voters]);

  console.log(`Contract deployed and verified at https://sepolia.etherscan.io/address/${votingContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
