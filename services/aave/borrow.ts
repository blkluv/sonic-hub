// services/aave/borrow.ts
import { getAavePoolClient, InterestRate } from './client';
import { ethers } from 'ethers';
import { getReservesData } from './get-reserves';

export const borrowToken = async ({
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
  
  // Get token decimals from the Aave protocol data provider
  const reservesData = await getReservesData();
  const tokenData = reservesData.find(
    reserve => reserve.underlyingAsset.toLowerCase() === token.toLowerCase()
  );
  
  if (!tokenData) {
    throw new Error('Token not supported by Aave');
  }
  
  // Format the amount according to token decimals
  const amountToBorrow = ethers.parseUnits(amount, tokenData.decimals);
  
  // Create borrow tx data
  const txData = await poolClient.borrow({
    user: userAddress,
    reserve: token,
    amount: amountToBorrow.toString(),
    interestRateMode,
    onBehalfOf: onBehalfOf || userAddress,
    referralCode: '0',
  });
  
  return { tx: txData };
};
