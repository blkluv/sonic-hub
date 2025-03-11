// services/aave/get-reserves.ts
import { formatReserves } from '@aave/math-utils';
import dayjs from 'dayjs';
import { poolDataProviderContract } from './get-user-data';
import * as markets from '@bgd-labs/aave-address-book';

export const getReservesData = async () => {
 
  try {
    const reserves = await poolDataProviderContract.getReservesHumanized({
          lendingPoolAddressProvider: markets.AaveV3Sonic.POOL_ADDRESSES_PROVIDER,
        });
      
    
    const currentTimestamp = dayjs().unix();
    
  const reservesArray = reserves.reservesData;
        const baseCurrencyData = reserves.baseCurrencyData;
        
        const formattedReserves = formatReserves({
          reserves: reservesArray,
          currentTimestamp,
          marketReferenceCurrencyDecimals:
            baseCurrencyData.marketReferenceCurrencyDecimals,
          marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        });
  
    
    return formattedReserves;
  } catch (error) {
    console.error('Error fetching reserves data:', error);
    throw error;
  }
};