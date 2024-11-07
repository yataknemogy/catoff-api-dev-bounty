import {
    Connection,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    Keypair,
} from "@solana/web3.js";
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ONCHAIN_CONFIG } from "../config";
import { ICreateTransaction, TransactionError, TransactionResult } from "../types/types";
import logger from "../logger";
import { GenericError } from "../errors/errorHandling";

export const createTransactionService = async (data: ICreateTransaction, signer: Keypair): Promise<TransactionResult | TransactionError> => {
    try {
        const connection = new Connection(ONCHAIN_CONFIG.devnet.nodeURL, "confirmed");
        const instructions: TransactionInstruction[] = [];
        const { blockhash } = await connection.getLatestBlockhash("confirmed");

        if (data.currency === "SOL") {
            const lamports = data.amount * Math.pow(10, 9);
            const transferInstruction = SystemProgram.transfer({
                fromPubkey: data.accountPublicKey,
                toPubkey: data.recipientPublicKey,
                lamports,
            });
            instructions.push(transferInstruction);
        } else {
            const mintAddress = await getMintPublicKeyForCurrency(data.currency, "devnet");
            const senderTokenAccount = await getAssociatedTokenAddress(mintAddress, data.accountPublicKey);
            const recipientTokenAccount = await getAssociatedTokenAddress(mintAddress, data.recipientPublicKey);

            const decimals = ONCHAIN_CONFIG.devnet.Decimals[data.currency];
            const transferInstruction = createTransferInstruction(
                senderTokenAccount,
                recipientTokenAccount,
                data.accountPublicKey,
                data.amount * Math.pow(10, decimals),
                [],
                TOKEN_PROGRAM_ID,
            );
            instructions.push(transferInstruction);
        }

        const transaction = new Transaction().add(...instructions);
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = signer.publicKey;

        await transaction.sign(signer);

        const signature = await connection.sendTransaction(transaction, [signer]);
        logger.info(`[createTransactionService] Successfully sent transaction. Signature: ${signature}`);

        return { success: true, transactionSignature: signature };
    } catch (error) {
        const errorMessage = (error instanceof Error ? error.message : 'Unknown error');
        logger.error(`[createTransactionService] Error creating transaction: ${errorMessage}`);
        throw new GenericError(`Error creating transaction: ${errorMessage}`, 500);
    }
};

const getMintPublicKeyForCurrency = async (currency: string, cluster: keyof typeof ONCHAIN_CONFIG): Promise<PublicKey> => {
    const config = ONCHAIN_CONFIG[cluster];
    switch (currency) {
        case "USDC":
            return config.usdcMintAddress;
        case "BONK":
            return config.bonkMintAddress;
        case "SEND":
            return config.sendMintAddress;
        default:
            throw new GenericError(`Unsupported currency: ${currency}`, 400);
    }
};
