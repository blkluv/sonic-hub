// ai/cdp/actions/index.ts
import { CdpAction, CdpActionSchemaAny } from "./cdp-action";

import { DeployNftAction } from "./deploy-nft";
import { DeployTokenAction } from "./deploy-token";
import { CreateLiquidityPoolAction } from "./create-liquidity"; // Add import for the new action
import { GetBalanceAction } from "./get-balance";
import { GetWalletDetailsAction } from "./get-wallet-details";
import { MintNftAction } from "./mint-nft";
import { TradeAction } from "./trade";
import { TransferAction } from "./transfer";
import { AddLiquidityAction } from "./add-liquidity";
import { RemoveLiquidityAction } from "./remove-liquidity";
import { GetTokenDataAction } from "./token-data";
import { GetTokenPriceChartAction } from "./token-price";
import {  RegisterBasenameAction } from "./register-basename";
import { RequestFaucetFundsAction } from "./request-faucet-funds";

export function getAllCdpActions(): CdpAction<CdpActionSchemaAny, any>[] {
  return [
    new GetWalletDetailsAction(),
    new DeployNftAction(),
    new DeployTokenAction(),
    new CreateLiquidityPoolAction(), // Add the new action
    new GetBalanceAction(),
    new MintNftAction(),
    new TradeAction(),
    new TransferAction(),
    new AddLiquidityAction(),
    new RemoveLiquidityAction(),
    new GetTokenDataAction(),
    new GetTokenPriceChartAction(),
    new RegisterBasenameAction(),
    new RequestFaucetFundsAction() // Add the new action
  ];
}

export const CDP_ACTIONS = getAllCdpActions();

export * from "./types";
export * from "./cdp-action";