import { ethers, network } from "hardhat";
import hre from "hardhat";

// This script deployes the contract to a blockchain and verifies it in Etherscan servic

// Entry point
async function main() {
  const signers = await ethers.getSigners();

  const voter1 = signers[0].address; // Anka's (deployer) public address
  const voter2 = "0xd0F723c6b2226dF56Fe41E63b9eAA66Eb540BcB8"; // Alfred's public address
  const voter3 = "0x0d731cfabC5574329823F26d488416451d2ea376"; // Aslan's public address

  let voters = [voter1, voter2, voter3];

  const VotingFactory = await ethers.getContractFactory("Voting");
  // Deployes the contract using the wallet of signers[0], which is Anka's wallet
  const votingContract = await VotingFactory.connect(signers[0]).deploy(voters);

  await votingContract.deployed();

  console.log("Deployments done, waiting for etherscan verifications");

  // Verifies a contract in Etherscan service
  const verify = async (addr: string, args: any[]) => {
    try {
      await hre.run("verify:verify", {
        address: addr,
        constructorArguments: args,
      });
    } catch (ex: any) {
      // This is due to some Etherscan inner trickiness:
      // Etherscan auto-verifies contracts which have the same bytecode as some already verified one
      if (ex.toString().indexOf("Already Verified") == -1) {
        throw ex;
      }
    }
  };

  if (network.name !== "localhost") {
    // Wait for the contract to be propagated inside Etherscan
    await new Promise((f) => setTimeout(f, 60000));
    await verify(votingContract.address, [voters]);
  }
  console.log(
    `Contract deployed and verified at https://sepolia.etherscan.io/address/${votingContract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
