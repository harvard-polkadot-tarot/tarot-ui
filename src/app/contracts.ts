import { ContractPromise } from '@polkadot/api-contract';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import metadata from './tarot-contract.json';

const address = "bRUguc1jqLCqy5XNdpt3QzQP5d76KoKk6um7tBsosVMcuZV";
const providerUrl = "wss://rpc.shiden.astar.network/";

// maximum gas to be consumed for the call. if limit is too small the call will fail.
const gasLimit = 3000n * 1000000n;
// a limit to how much Balance to be used to pay for the storage created by the contract call
// if null is passed, unlimited balance can be used
const storageDepositLimit = null;

async function ContractApi(): Promise<ApiPromise> {
    const wsProvider = new WsProvider(providerUrl);
    return ApiPromise.create({ provider: wsProvider });
}

export async function fee(from: string) {
    const api = await ContractApi();
    const contract = new ContractPromise(api, metadata, address);
    const feeVal = await contract.query.fee!(from, { gasLimit: -1 });
    return feeVal;
}

export async function draw(account: InjectedAccountWithMeta, seed: Uint8Array, value: number) {
    const api = await ContractApi();
    const contract = new ContractPromise(api, metadata, address);
    const drawInstrinsic = await contract.tx.draw!({storageDepositLimit, gasLimit, value},
        seed);
        
    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await web3FromSource(account.meta.source);

    await drawInstrinsic.signAndSend(account.address, { signer: injector.signer }, result => {
        if (result.status.isInBlock) {
            console.log('in a block');
        } else if (result.status.isFinalized) {
            console.log('finalized');
        }

        const events: Record<string, number> = {};
        if (result.isInBlock || result.isFinalized) {
            console.log(`Result: ${result}`);
        }
    });
}