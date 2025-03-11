// services/aave/swap.ts
import { ethers } from 'ethers';
import { getReservesData } from './get-reserves';

const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
];

// Aave ParaSwap Adapter address - replace with actual Sonic address
const PARASWAP_ADAPTER = '0x0b8f78466ff74827b798d87b1ad2b2b858c90833';

export const swapTokens = async ({
  signer,
  fromToken,
  toToken,
  amount,
  minAmountToReceive,
  swapAll = false,
}: {
  signer: ethers.Signer;
  fromToken: string;
  toToken: string;
  amount: string;
  minAmountToReceive: string;
  swapAll?: boolean;
}) => {
  const userAddress = await signer.getAddress();
  
  // Get token details
  const reservesData = await getReservesData();
  const fromTokenData = reservesData.find(
    reserve => reserve.underlyingAsset.toLowerCase() === fromToken.toLowerCase()
  );
  const toTokenData = reservesData.find(
    reserve => reserve.underlyingAsset.toLowerCase() === toToken.toLowerCase()
  );
  
  if (!fromTokenData || !toTokenData) {
    throw new Error('One or both tokens not supported by Aave');
  }
  
  // Connect to the token contract
  const fromTokenContract = new ethers.Contract(fromToken, ERC20_ABI, signer);
  const fromTokenDecimals = await fromTokenContract.decimals();
  
  // Format the amounts according to token decimals
  const amountToSwap = swapAll
    ? ethers.MaxUint256.toString()
    : ethers.parseUnits(amount, fromTokenDecimals).toString();
  
  const minAmountOut = ethers.parseUnits(
    minAmountToReceive, 
    toTokenData.decimals
  ).toString();
  
  // Check if approval is needed
  if (!swapAll) {
    const parsedAmount = ethers.parseUnits(amount, fromTokenDecimals);
    const allowance = await fromTokenContract.allowance(userAddress, PARASWAP_ADAPTER);
    
    if (allowance.lt(parsedAmount)) {
      // Approve token transfer
      const approveTx = await fromTokenContract.approve(PARASWAP_ADAPTER, ethers.MaxUint256);
      await approveTx.wait();
    }
  }
  
  // Create swap transaction
  // Note: This is a simplified implementation. 
  // In a real implementation, you would likely:
  // 1. Get a quote from ParaSwap API
  // 2. Build the swap transaction with the returned data
  // 3. Execute the swap via the ParaSwap adapter
  
  // For demonstration purposes, we're creating a mock transaction
  const txData = {
    to: PARASWAP_ADAPTER,
    data: ethers.solidityPacked(
      ['bytes4', 'address', 'address', 'uint256', 'uint256'],
      [
        '0x85a2f766', // swapExactTokensForTokens function selector
        fromToken,
        toToken,
        amountToSwap,
        minAmountOut
      ]
    ),
    value: '0',
  };
  
  return { tx: txData };
};