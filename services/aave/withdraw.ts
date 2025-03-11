// services/aave/withdraw.ts
import { getAavePoolClient } from './client';
import { ethers } from 'ethers';
import { getReservesData } from './get-reserves';

export const withdrawToken = async ({
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
  
  // Get token decimals from the Aave protocol data provider
  const reservesData = await getReservesData();
  const tokenData = reservesData.find(
    reserve => reserve.underlyingAsset.toLowerCase() === token.toLowerCase()
  );
  
  if (!tokenData) {
    throw new Error('Token not supported by Aave');
  }
  
  // Format the amount according to token decimals
  const amountToWithdraw = amount === '-1' 
    ? ethers.MaxUint256.toString() // -1 means withdraw all
    : ethers.parseUnits(amount, tokenData.decimals).toString();
  
  // Create withdraw tx data
  const txData = await poolClient.withdraw({
    user: userAddress,
    reserve: token,
    amount: amountToWithdraw,
    onBehalfOf: onBehalfOf || userAddress,
  });
  
  return { tx: txData };
};
