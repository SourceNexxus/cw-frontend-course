import { useChain } from '@cosmos-kit/react';
import { useEffect, useState } from 'react';
import { Cw20QueryClient } from '../codegen/Cw20.client';


export function useTokenBalance(contractAddress: string) {
    // offline signer
    const { getCosmWasmClient, address } = useChain("cosmwasmtestnet");
    const [cw20Client, setcw20Client] = useState<Cw20QueryClient | null>(null);
    const [ balance, setbalance ] = useState<string | null>(null);

    // cw20 client
    useEffect(() => {
        getCosmWasmClient().then(cosmWasmClient => {
            if (!cosmWasmClient) return;
            const newClient = new Cw20QueryClient(cosmWasmClient, contractAddress);
            setcw20Client(newClient);
        });
    }, [contractAddress, address, getCosmWasmClient]);

    // query and return balance
    useEffect(() => {
        if (cw20Client && address){
            cw20Client.balance({address}).then((res)=> {
                setbalance(res.balance);
            });
        }
    });

    return balance ?? undefined;
}