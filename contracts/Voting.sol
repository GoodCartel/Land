// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @notice A simple voting contract
 */
contract Voting {
    /**
     * @notice Which addresses are voters
     */
    mapping(address => bool) public isVoter;

    /**
     * @notice Which addresses have already voted
     */
    mapping(address => bool) public hasVoted;

    /**
     * @notice How many 'yes' votes
     */
    uint256 public yesVotes = 0;

    /**
     * @notice How many 'no' votes
     */
    uint256 public noVotes = 0;

    /**
     * @notice How many voters exist in total
     */
    uint256 public voterCount = 0;

    /**
     * @notice Current suggested charity target address
     */
    address public target;

    /**
     * @notice Instantiates the contract. Called automatically upon deployment
     */
    constructor(address[] memory voters) {
        for (uint256 i = 0; i < voters.length; i++) {
            isVoter[voters[i]] = true;
            voterCount++;
        }
    }

    /**
     * @notice Any voter can suggest a new target for the charity assets. Works only if no target set yet.
     */
    function suggestTarget(address suggestedTarget) public {
        require(isVoter[msg.sender] == true, "Not a voter");
        // 0x0 means the value has not been set - there is no 'null' in Solidity
        if (target == address(0x0)) {
            target = suggestedTarget;
        }
    }

    /**
     * @notice Vote on a suggested charity target
     */
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

    /**
     * @notice Distributes the assets to the chosen charity address if the vote passes
     */
    function distribute() public {
        require(yesVotes + noVotes >= voterCount, "Not enough votes");
        if (yesVotes > noVotes) {
            payable(target).transfer(address(this).balance);
        }
        // TODO: reset the contract state so a new vote can be initiated
    }

    /**
     * @notice Deposit native assets to the contract
     */
    function deposit() public payable {}
}
