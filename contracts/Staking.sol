// SPDX-License-Identifier: MIT
pragma solidity > 0.8.2 < 0.9.0;

// ERC20 token Docs :- https://docs.openzeppelin.com/contracts/5.x/erc20-supply
// https://github.com/ConsenSysMesh/openzeppelin-solidity/blob/master/contracts/  Openzeppelin docs

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard {
    IERC20 public s_stakingToken;  // This is IERC20 data-type becuase we use the interface of IERC20 so we can easily use the functions of this standard
    IERC20 public s_rewardToken;

    uint public constant REWARD_RATE = 10;  // reward rate per sec is 10 tokens
    uint private userTotalStakedTokens;
    uint public rewardPerTokenStored;  // Initially Zero 0
    uint public lastUpdateTime;  // To check the user events on last action

    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public rewards;
    mapping(address => uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed  user, uint256 indexed  amount);
    event RewardClaimed(address indexed user, uint256 indexed amout);

    constructor(address stakingToken, address rewardToken){
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }

    function rewardPerToken() public view returns (uint) {
        if(userTotalStakedTokens == 0){  // if user haven't staked tokens in our liquidity pool so it means we have 0 userTotalStakedTokens  
            return rewardPerTokenStored; // return zero reward;
        } 
        // if someone staked the tokens so how much time will it be staked
        // block.timestamp (or block.blocktimestamp in older versions) represents the current block timestamp. It is a property of the current block and returns the Unix timestamp (the number of seconds that have elapsed since January 1, 1970)  
        //            currentUpdateTime  -    0 (second)
        uint totalTime = block.timestamp - lastUpdateTime;
        uint totalRewards = REWARD_RATE * totalTime;  
        // Reward Tokens = (amount staked by user) * Reward Rate / total staked amount 
        return  rewardPerTokenStored + totalRewards/userTotalStakedTokens;  // because we also update the previous value of rewardPerTokenStored
    }


    // Amount staked by a user
    function earned(address account) public view returns (uint) {
        return (stakedBalance[account])*(rewardPerToken() - userRewardPerTokenPaid[account]);
    }

    // Basically it is a check point for lastUpdateTime means store your last seconds when you are withdrawing amount 
    modifier updateReward(address account){
        rewardPerTokenStored = rewardPerToken(); // it is not for a specific user
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;  //  Placeholder indicating that the main function's code should be executed
    }

    function stake(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        userTotalStakedTokens += amount;
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);

        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer Failed");
    } 

    function withdraw(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        userTotalStakedTokens -= amount;
        stakedBalance[msg.sender] -= amount;
        emit Withdrawn(msg.sender, amount);

        bool success = s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer Failed");
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        require(reward > 0, "No rewards to be claimed");
        rewards[msg.sender] = 0;  // best practices that reward should be zero

        emit RewardClaimed(msg.sender, reward);

        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Reward Transfer Failed");
    }
}