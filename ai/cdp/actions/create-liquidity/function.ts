// ai/cdp/actions/deposit-liquidity/function.ts
import { Wallet } from "@coinbase/coinbase-sdk";

import { CreateLiquidityPoolArgumentsType, CreateLiquidityPoolActionResultType } from "./types";

export async function createLiquidityPool(
  wallet: Wallet,
  args: CreateLiquidityPoolArgumentsType,
): Promise<CreateLiquidityPoolActionResultType> {
  try {
    // Call the CDP API to deposit liquidity
    const deposit = await wallet.invokeContract({
      contractAddress: args.contractAddress,
      method: "createLiquidity",
      args: {
      tokenA: args.tokenA,
      tokenB: args.tokenB,
      amountA: args.amountA,
      amountB: args.amountB,
      fee: args.fee || 0.003,
      }
    });

    const result = await deposit.wait();

    if (!result) {
      throw new Error("Failed to deposit liquidity");
    }

    const transaction = result.getTransaction();
    const transactionHash = transaction?.getTransactionHash();

    if (!transactionHash) {
      throw new Error("No transaction hash found");
    }

   
    return {
      message: `Successfully created liquidity pool on Sonic Mainnet. LP token address: ${result.getContractAddressId()}`,
      body: {
        transactionHash,
        poolAddress: args.contractAddress,
        lpTokenAddress: result.getContractAddressId(),
      }
    };
  } catch (error) {
    return {
      message: `Error creating liquidity: ${error}`,
    };
  }
}