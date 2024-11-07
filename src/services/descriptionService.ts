import axios from 'axios';
import { ONCHAIN_CONFIG } from '../config';
import logger from '../logger';

const baseUrl = ONCHAIN_CONFIG.devnet.BackendURL;
const partnerApiKey = ONCHAIN_CONFIG.devnet.partnerApiKey;

export const generateAIDescriptionService = async (name: string, participationType: string) => {
    try {
        const response = await axios.post(`${baseUrl}/generate-description-x-api-key/`, {
            prompt: name,
            participation_type: participationType,
            result_type: 'voting',
        }, {
            headers: { 'x-api-key': partnerApiKey, 'Content-Type': 'application/json' },
            timeout: 200000,
        });
        return { data: response.data, error: null };
    } catch (error) {
        logger.error(`Error generating AI description: ${error}`);
        return { data: null, error };
    }
};
