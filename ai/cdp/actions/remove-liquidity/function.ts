// actions/remove-liquidity/function.ts
import { Wallet } from "@coinbase/coinbase-sdk";
import { RemoveLiquidityArgumentsType, RemoveLiquidityActionResultType } from "./types";

export async function removeLiquidity(
  wallet: Wallet,
  args: RemoveLiquidityArgumentsType,
): Promise<RemoveLiquidityActionResultType> {
  try {
    // Implementation would interact with Sonic DEX to remove liquidity
    const removeLiquidityTx = await wallet.invokeContract({
      contractAddress: args.poolAddress,
      method: "removeLiquidity",
      args: {
      lpTokenAmount: args.lpTokenAmount,
      minAmountA: args.minAmountA,
      minAmountB: args.minAmountB,
      deadline: args.deadline || Math.floor(Date.now() / 1000) + 1200, // Default to 20 minutes
  }});

    const result = await removeLiquidityTx.wait();

    if (!result) {
      throw new Error("Failed to remove liquidity");
    }

    const transaction = result.getTransaction();
    const transactionHash = transaction?.getTransactionHash();

    if (!transactionHash) {
      throw new Error("No transaction hash found");
    }

    return {
      message: `Successfully removed liquidity from pool.`,
      body: {
        transactionHash,
      }
    };
  } catch (error) {
    return {
      message: `Error removing liquidity: ${error}`,
    };
  }
}