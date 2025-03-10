// ai/cdp/actions/get-token-data/function.ts
import { GetTokenDataArgumentsType, GetTokenDataActionResultType } from "./types";

export async function getTokenData(
  args: GetTokenDataArgumentsType
): Promise<GetTokenDataActionResultType> {
  try {
    // Use tokenId if provided, otherwise try to look up by symbol
    const tokenIdentifier = args.tokenId || args.symbol?.toLowerCase();
    
    if (!tokenIdentifier) {
      return {
        message: "Error: Either tokenId or symbol must be provided",
      };
    }

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIdentifier}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return {
        message: `No token data found for ${tokenIdentifier}`,
      };
    }

    const tokenData = data[0];

    return {
      message: `Successfully retrieved data for ${tokenData.name} (${tokenData.symbol.toUpperCase()})\nCurrent price: $${tokenData.current_price}\nMarket cap: $${tokenData.market_cap.toLocaleString()}\n24h volume: $${tokenData.total_volume.toLocaleString()}\n24h change: ${tokenData.price_change_percentage_24h.toFixed(2)}%`,
      body: tokenData
    };
  } catch (error) {
    return {
      message: `Error fetching token data: ${error}`,
    };
  }
}
