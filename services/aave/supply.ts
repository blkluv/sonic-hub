import { ethers } from 'ethers';
import { getAavePoolClient } from './client';

// Minimal ERC-20 ABI
const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
];

export const supplyToken = async ({
  signer,
  token,
  amount,
  onBehalfOf,
}: {
  signer: ethers.Signer;
  token: string;
  amount: string;
  onBehalfOf?: string;
}) => {
  const poolClient = getAavePoolClient();
  const userAddress = await signer.getAddress();

  // Connect to the token contract
  const tokenContract = new ethers.Contract(token, ERC20_ABI, signer);
  const tokenDecimals = await tokenContract.decimals();

  // Format the amount according to token decimals
  const amountToSupply = ethers.parseUnits(amount, tokenDecimals);

  // Check if approval is needed
  const allowance = await tokenContract.allowance(userAddress, poolClient.poolAddress);
  if (allowance.lt(amountToSupply)) {
    // Approve token transfer
    const approveTx = await tokenContract.approve(poolClient.poolAddress, ethers.MaxUint256);
    await approveTx.wait();
  }

  // Create supply transaction data
  const txData = await poolClient.supply({
    user: onBehalfOf || userAddress,
    reserve: token,
    amount: amountToSupply.toString(),
    onBehalfOf: onBehalfOf || userAddress,
    referralCode: '0',
  });

  return { tx: txData };
};
