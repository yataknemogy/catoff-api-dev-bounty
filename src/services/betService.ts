import { IPlaceBet, ResultWithError, BetResult } from '../types/types';
import axios from 'axios';
import { ONCHAIN_CONFIG } from '../config';
import logger from '../logger';

export const placeBetService = async (betData: IPlaceBet): Promise<ResultWithError<BetResult>> => {
    try {
        const response = await axios.post(`${ONCHAIN_CONFIG.devnet.BackendURL}/bet`, betData, {
            headers: { 'x-api-key': ONCHAIN_CONFIG.devnet.partnerApiKey },
        });

        if (!response.data.success || !response.data.transactionSignature) {
            throw new Error('Invalid response from the server');
        }

        return {
            data: {
                success: true,
                betID: response.data.betID,
                transactionSignature: response.data.transactionSignature,
            },
            error: null,
        };
    } catch (error) {
        logger.error(`Error placing bet: ${error}`);
        return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
};
