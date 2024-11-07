import axios from 'axios';
import { ONCHAIN_CONFIG } from '../config';
import { ICreateChallenge, IChallengeById, ResultWithError } from '../types/types';
import logger from '../logger';

const baseUrl = ONCHAIN_CONFIG.devnet.BackendURL;
const partnerApiKey = ONCHAIN_CONFIG.devnet.partnerApiKey;

export const createChallengeService = async (challengeData: ICreateChallenge): Promise<ResultWithError> => {
    try {
        const response = await axios.post(`${baseUrl}/challenge`, challengeData, {
            headers: { 'x-api-key': partnerApiKey, 'Content-Type': 'application/json' },
            timeout: 100000,
        });
        return { data: response.data.data, error: null };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error(`Error creating challenge: ${errorMessage}`);
        return { data: null, error: errorMessage };
    }
};

export const getChallengeByIdService = async (challengeId: number): Promise<ResultWithError> => {
    try {
        const response = await axios.get(`${baseUrl}/challenge/${challengeId}`, {
            headers: { 'x-api-key': partnerApiKey, 'Content-Type': 'application/json' },
            timeout: 100000,
        });
        return { data: response.data.data as IChallengeById, error: null };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error(`Error fetching challenge by ID: ${errorMessage}`);
        return { data: null, error: errorMessage };
    }
};
