// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    mapping(address => bool) public isVoter;
    mapping(address => bool) public hasVoted;
    uint256 public yesVotes = 0;
    uint256 public noVotes = 0;
    uint256 public voterCount = 0;
    address target;

    constructor(address[] memory voters) {
        for (uint256 i = 0; i < voters.length; i++) {
            isVoter[voters[i]] = true;
            voterCount++;
        }
    }

    function suggestTarget(address suggestedTarget) public {
        require(isVoter[msg.sender] == true, "Not a voter");
        if (target == address(0x0)) {
            target = suggestedTarget;
        }
    }

    function vote(bool userVote) public {
        require(isVoter[msg.sender] == true, "Not a voter");
        require(!hasVoted[msg.sender], "Already voted");
        require(target != address(0x0), "No target suggested");
        hasVoted[msg.sender] = true;
        if (userVote == true) {
            yesVotes++;
        } else {
            noVotes++;
        }
    }

    function distribute() public {
        require(yesVotes + noVotes >= voterCount, "Not enough votes");
        if (yesVotes > noVotes) {
            payable(target).transfer(address(this).balance);
        }
        // TODO: reset the contract state so a new vote can be initiated
    }

    function deposit() public payable {}
}
