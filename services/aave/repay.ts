// services/aave/repay.ts
import { getAavePoolClient, InterestRate } from './client';
import { ethers } from 'ethers';

const ERC20_ABI = [
    'function decimals() view returns (uint8)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
  ];
  

export const repayToken = async ({
  signer,
  token,
  amount,
  interestRateMode,
  onBehalfOf,
}: {
  signer: ethers.Signer;
  token: string;
  amount: string;
  interestRateMode: InterestRate;
  onBehalfOf?: string;
}) => {
  const poolClient = getAavePoolClient();
  const userAddress = await signer.getAddress();
  
  const tokenContract = new ethers.Contract(token, ERC20_ABI, signer);
  const tokenDecimals = await tokenContract.decimals();
  
  // Format the amount according to token decimals
  const amountToRepay = amount === '-1'
    ? ethers.MaxUint256.toString() // -1 means repay all
    : ethers.parseUnits(amount, tokenDecimals).toString();
  
  // Check if approval is needed
  if (amount !== '-1') {
    const parsedAmount = ethers.parseUnits(amount, tokenDecimals);
    const allowance = await tokenContract.allowance(userAddress, poolClient.poolAddress);
    
    if (allowance.lt(parsedAmount)) {
      // Approve token transfer
      const approveTx = await tokenContract.approve(poolClient.poolAddress, ethers.MaxUint256);
      await approveTx.wait();
    }
  }
  
  // Create repay tx data
  const txData = await poolClient.repay({
    user: userAddress,
    reserve: token,
    amount: amountToRepay,
    interestRateMode,
    onBehalfOf: onBehalfOf || userAddress,
  });
  
  return { tx: txData };
};
