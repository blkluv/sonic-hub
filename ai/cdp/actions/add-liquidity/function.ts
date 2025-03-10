// actions/add-liquidity/function.ts
import { Wallet } from "@coinbase/coinbase-sdk";
import { AddLiquidityArgumentsType, AddLiquidityActionResultType } from "./types";

export async function addLiquidity(
  wallet: Wallet,
  args: AddLiquidityArgumentsType,
): Promise<AddLiquidityActionResultType> {
  try {
    // Implementation would interact with Sonic DEX to add liquidity
    const addLiquidityTx = await wallet.invokeContract({
      contractAddress: args.poolAddress,
      method: "addLiquidity",
      args: {
      amountA: args.amountA,
      amountB: args.amountB,
      slippageTolerance: args.slippageTolerance || 0.5, // Default to 0.5% slippage
      deadline: args.deadline || Math.floor(Date.now() / 1000) + 1200, // Default to 20 minutes
   } });

    const result = await addLiquidityTx.wait();

    if (!result) {
      throw new Error("Failed to add liquidity");
    }

    const transaction = result.getTransaction();
    const transactionHash = transaction?.getTransactionHash();

    if (!transactionHash) {
      throw new Error("No transaction hash found");
    }

    return {
      message: `Successfully added liquidity to pool.`,
      body: {
        transactionHash,
      }
    };
  } catch (error) {
    return {
      message: `Error adding liquidity: ${error}`,
    };
  }
}