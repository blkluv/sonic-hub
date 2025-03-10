// ai/cdp/actions/get-token-price-chart/function.ts
import { GetTokenPriceChartArgumentsType, GetTokenPriceChartActionResultType } from "./types";

export async function getTokenPriceChart(
  args: GetTokenPriceChartArgumentsType
): Promise<GetTokenPriceChartActionResultType> {
  try {
    const { tokenId, days } = args;
    
    // Get token info first
    const infoUrl = `https://api.coingecko.com/api/v3/coins/${tokenId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`;
    const infoResponse = await fetch(infoUrl);
    
    if (!infoResponse.ok) {
      throw new Error(`CoinGecko API error: ${infoResponse.status} ${infoResponse.statusText}`);
    }
    
    const tokenInfo = await infoResponse.json();
    
    // Now get price data
    const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.prices || data.prices.length === 0) {
      return {
        message: `No price data found for ${tokenId}`,
      };
    }

    const priceData = data.prices.map((point: [number, number]) => ({
      timestamp: point[0],
      price: point[1]
    }));

    return {
      message: `Successfully retrieved price chart data for ${tokenInfo.name} (${tokenInfo.symbol.toUpperCase()}) for the last ${days} days. The chart data includes ${priceData.length} data points.`,
      body: {
        tokenId,
        tokenName: tokenInfo.name,
        tokenSymbol: tokenInfo.symbol,
        days,
        priceData
      }
    };
  } catch (error) {
    return {
      message: `Error fetching token price chart data: ${error}`,
    };
  }
}