// services/aave/client.ts
import { Pool, InterestRate } from '@aave/contract-helpers';
import { ethers } from 'ethers';

export const getAavePoolClient = () => {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SONIC_RPC_URL!);
  
  // Addresses from Aave Sonic Mainnet deployment
  const LENDING_POOL_ADDRESS_PROVIDER = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'; // Replace with actual Sonic address
  
  return new Pool(provider, {
    POOL: LENDING_POOL_ADDRESS_PROVIDER,
    WETH_GATEWAY: '0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C', // Replace with actual Sonic address
  });
};

export { InterestRate };