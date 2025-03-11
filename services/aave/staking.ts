// services/aave/staking.ts
import { ethers } from 'ethers';

// Minimal ERC-20 ABI
const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
];

// Staking contract ABI
const STAKING_ABI = [
  'function stake(address onBehalfOf, uint256 amount) external',
  'function redeem(address to, uint256 amount) external',
  'function cooldown() external',
  'function claimRewards(address to, uint256 amount) external',
  'function getTotalRewardsBalance(address staker) external view returns (uint256)',
  'function stakersCooldowns(address staker) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
];

// Replace with actual Sonic Safety Module address
const SAFETY_MODULE_ADDRESS = '0x0c51Ef934F456a9f0F42d6F2D5822F9377a0F0F3';
// Replace with actual AAVE token address on Sonic
const AAVE_TOKEN_ADDRESS = '0x4da27a545c0c5B758a6BA100e3a049001de870f5';

export const getStakingClient = () => {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SONIC_RPC_URL!);
  return new ethers.Contract(SAFETY_MODULE_ADDRESS, STAKING_ABI, provider);
};

export const stakeTokens = async ({
  signer,
  amount,
  onBehalfOf,
}: {
  signer: ethers.Signer;
  amount: string;
  onBehalfOf?: string;
}) => {
  const stakingContract = getStakingClient().connect(signer) as ethers.Contract & { stake: (onBehalfOf: string, amount: ethers.BigNumberish) => Promise<ethers.ContractTransaction> };
  const userAddress = await signer.getAddress();
  
  // Connect to the AAVE token contract
  const aaveToken = new ethers.Contract(AAVE_TOKEN_ADDRESS, ERC20_ABI, signer);
  const tokenDecimals = await aaveToken.decimals();
  
  // Format the amount according to token decimals
  const amountToStake = ethers.parseUnits(amount, tokenDecimals);
  
  // Check if approval is needed
  const allowance = await aaveToken.allowance(userAddress, SAFETY_MODULE_ADDRESS);
  if (allowance.lt(amountToStake)) {
    // Approve token transfer
    const approveTx = await aaveToken.approve(SAFETY_MODULE_ADDRESS, ethers.MaxUint256);
    await approveTx.wait();
  }
  
  // Create stake transaction
  const tx = await stakingContract.stake(
    onBehalfOf || userAddress,
    amountToStake
  );
  
  return { tx };
};

export const unstakeTokens = async ({
  signer,
  amount,
  recipient,
}: {
  signer: ethers.Signer;
  amount: string;
  recipient?: string;
}) => {
  const stakingContract = getStakingClient().connect(signer) as ethers.Contract & { redeem: (to: string, amount: ethers.BigNumberish) => Promise<ethers.ContractTransaction> };
  const userAddress = await signer.getAddress();
  
  // Get token decimals
  const aaveToken = new ethers.Contract(AAVE_TOKEN_ADDRESS, ERC20_ABI, signer);
  const tokenDecimals = await aaveToken.decimals();
  
  // Format the amount according to token decimals
  const amountToUnstake = amount === '-1'
    ? ethers.MaxUint256.toString() // -1 means unstake all
    : ethers.parseUnits(amount, tokenDecimals).toString();
  
  // Create unstake transaction
  const tx = await stakingContract.redeem(
    recipient || userAddress,
    amountToUnstake
  );
  
  return { tx };
};

export const activateCooldown = async ({
  signer,
}: {
  signer: ethers.Signer;
}) => {
  const stakingContract = getStakingClient().connect(signer) as ethers.Contract & { cooldown: () => Promise<ethers.ContractTransaction> };
  
  // Create cooldown transaction
  const tx = await stakingContract.cooldown();
  
  return { tx };
};

export const claimStakingRewards = async ({
  signer,
  amount,
  recipient,
}: {
  signer: ethers.Signer;
  amount: string;
  recipient?: string;
}) => {
  const stakingContract = getStakingClient().connect(signer) as ethers.Contract & { claimRewards: (to: string, amount: ethers.BigNumberish) => Promise<ethers.ContractTransaction> };
  const userAddress = await signer.getAddress();
  
  // Get token decimals
  const aaveToken = new ethers.Contract(AAVE_TOKEN_ADDRESS, ERC20_ABI, signer);
  const tokenDecimals = await aaveToken.decimals();
  
  // Format the amount according to token decimals
  const amountToClaim = amount === '-1'
    ? ethers.MaxUint256.toString() // -1 means claim all
    : ethers.parseUnits(amount, tokenDecimals).toString();
  
  // Create claim rewards transaction
  const tx = await stakingContract.claimRewards(
    recipient || userAddress,
    amountToClaim
  );
  
  return { tx };
};

export const getStakingUserData = async (userAddress: string) => {
  const stakingContract = getStakingClient();
  
  // Get user staking balance
  const stakedBalance = await stakingContract.balanceOf(userAddress);
  
  // Get user rewards balance
  const rewardsBalance = await stakingContract.getTotalRewardsBalance(userAddress);
  
  // Get user cooldown timestamp
  const cooldownTimestamp = await stakingContract.stakersCooldowns(userAddress);
  
  // Create a timestamp for the current time
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  // Calculate cooldown status
  const isCoolingDown = cooldownTimestamp.gt(0) && cooldownTimestamp.lt(currentTimestamp);
  const cooldownEndTime = cooldownTimestamp.toNumber() > 0 ? new Date(cooldownTimestamp.toNumber() * 1000) : null;
  
  return {
    stakedBalance: stakedBalance.toString(),
    rewardsBalance: rewardsBalance.toString(),
    cooldownTimestamp: cooldownTimestamp.toString(),
    isCoolingDown,
    cooldownEndTime,
  };
};