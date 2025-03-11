// services/aave/get-user-data.ts
import { formatUserSummary, formatReserves } from '@aave/math-utils';
import {
    UiPoolDataProvider,
    ChainId,
  } from '@aave/contract-helpers';
import dayjs from 'dayjs';
import * as markets from '@bgd-labs/aave-address-book';
import { ethers } from 'ethers';



  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SONIC_RPC_URL!);

 export const poolDataProviderContract = new UiPoolDataProvider({
    uiPoolDataProviderAddress: markets.AaveV3Sonic.UI_POOL_DATA_PROVIDER,
    provider,
    chainId: ChainId.sonic,
  });




export const getUserReserves = async (userAddress: string) => {
  try {
    // Get user account data and reserves data
    const reserves = await poolDataProviderContract.getReservesHumanized({
        lendingPoolAddressProvider: markets.AaveV3Sonic.POOL_ADDRESSES_PROVIDER,
      });
    
      const userReserves = await poolDataProviderContract.getUserReservesHumanized({
        lendingPoolAddressProvider: markets.AaveV3Sonic.POOL_ADDRESSES_PROVIDER,
        user: userAddress,
      });
    
      const reservesArray = reserves.reservesData;
      const baseCurrencyData = reserves.baseCurrencyData;
      const userReservesArray = userReserves.userReserves;
      
      const currentTimestamp = dayjs().unix();
      
      const formattedReserves = formatReserves({
        reserves: reservesArray,
        currentTimestamp,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      });

      const userSummary = formatUserSummary({
        currentTimestamp,
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        userReserves: userReservesArray,
        formattedReserves,
        userEmodeCategoryId: userReserves.userEmodeCategoryId,
      });

    return userSummary;
  } catch (error) {
    console.error('Error fetching user reserves:', error);
    throw error;
  }
};