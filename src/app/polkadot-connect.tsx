"use client";

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { useState } from 'react';
import { draw } from './contracts';


export const PolkadotConnect = () => {
  

    const [renderCount, setRenderCount] = useState(0);
    console.log("render count");
    const createTarotTx = async () => {
        const enabled = await web3Enable("Tarot");
        const accounts = await web3Accounts();    

        const encoder = new TextEncoder();
        await draw(accounts[0]!, encoder.encode("slk1o23213122222"), 1000000000000000);
    }

    
    return (
        <div>
            <button
                onClick={() => {
                    createTarotTx();
                }}
            >Create Tarot TX</button>
        </div>
    )
}