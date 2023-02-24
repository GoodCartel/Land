import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Voting } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("Voting", function () {
  let votingContract: Voting;
  let voter1: SignerWithAddress,
    voter2: SignerWithAddress,
    voter3: SignerWithAddress,
    nonVoter: SignerWithAddress,
    randomAddress1: string,
    randomAddress2: string,
    randomAddress3: string;

  beforeEach(async function () {
    const signers = await ethers.getSigners();

    voter1 = signers[0];
    voter2 = signers[1];
    voter3 = signers[2];
    nonVoter = signers[3];

    randomAddress1 = ethers.Wallet.createRandom().address;
    randomAddress2 = ethers.Wallet.createRandom().address;
    randomAddress3 = ethers.Wallet.createRandom().address;

    let voters = [voter1.address, voter2.address, voter3.address];

    const VotingFactory = await ethers.getContractFactory("Voting");
    votingContract = await VotingFactory.connect(signers[0]).deploy(voters);
  });

  describe("Deployment", async function () {
    it("Sets the right voters", async function () {
      expect(await votingContract.isVoter(voter1.address)).to.true;
      expect(await votingContract.isVoter(voter2.address)).to.true;
      expect(await votingContract.isVoter(voter3.address)).to.true;
    });

    it("Sets the right voter count", async function () {
      const count = await votingContract.voterCount();
      expect(count).to.be.equal(3);
    });

    it("Non-voters are not set as voters", async function () {
      expect(await votingContract.isVoter(nonVoter.address)).to.false;
    });
  });

  describe("Sending assets", async function () {
    it("Works for a single deposit", async function () {
      await votingContract.connect(nonVoter).deposit({ value: 1 });
      const balance = await ethers.provider.getBalance(votingContract.address);
      expect(balance).to.be.equal(BigNumber.from(1));
    });

    it("Works for multiple deposits", async function () {
      await votingContract.connect(nonVoter).deposit({ value: 1 });
      await votingContract.connect(voter2).deposit({ value: 2 });
      const balance = await ethers.provider.getBalance(votingContract.address);
      expect(balance).to.be.equal(BigNumber.from(3));
    });
  });

  describe("Voting", async function () {
    it("Works for a single voter", async function () {
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);

      const yesVotes = await votingContract.yesVotes();
      const noVotes = await votingContract.noVotes();
      const hasVoted = await votingContract.hasVoted(voter1.address);

      expect(yesVotes).to.be.equal(1);
      expect(noVotes).to.be.equal(0);
      expect(hasVoted).to.true;
    });

    it("Works for multiple voters", async function () {
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);
      await votingContract.connect(voter2).vote(false);
      await votingContract.connect(voter3).vote(true);

      const yesVotes = await votingContract.yesVotes();
      const noVotes = await votingContract.noVotes();

      expect(yesVotes).to.be.equal(2);
      expect(noVotes).to.be.equal(1);
    });

    it("Fails if not a voter", async function () {
      await expect(
        votingContract.connect(nonVoter).vote(true)
      ).to.be.revertedWith("Not a voter");
    });

    it("Fails for double voting", async function () {
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);

      await expect(
        votingContract.connect(voter1).vote(false)
      ).to.be.revertedWith("Already voted");
    });

    it("Fails when no target", async function () {
      await expect(
        votingContract.connect(voter1).vote(false)
      ).to.be.revertedWith("No target suggested");
    });
  });

  describe("Distribution", async function () {
    it("Works", async function () {
      const sentValue = 4;
      await votingContract.connect(nonVoter).deposit({ value: sentValue });
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);
      await votingContract.connect(voter2).vote(true);
      await votingContract.connect(voter3).vote(true);

      await votingContract.distribute();

      const balance = await ethers.provider.getBalance(randomAddress3);
      expect(balance).to.be.equal(BigNumber.from(sentValue));
    });

    it("Doesn't do anything if no consensus", async function () {
      const sentValue = 4;
      await votingContract.connect(nonVoter).deposit({ value: sentValue });
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);
      await votingContract.connect(voter2).vote(false);
      await votingContract.connect(voter3).vote(false);

      await votingContract.distribute();

      const balance = await ethers.provider.getBalance(randomAddress3);
      expect(balance).to.be.equal(BigNumber.from(0));
    });

    it("Fails if not enough votes", async function () {
      const sentValue = 4;
      await votingContract.connect(nonVoter).deposit({ value: sentValue });
      await votingContract.connect(voter1).suggestTarget(randomAddress3);
      await votingContract.connect(voter1).vote(true);
      await votingContract.connect(voter2).vote(false);

      await expect(votingContract.distribute()).to.be.revertedWith(
        "Not enough votes"
      );
    });
  });
});
