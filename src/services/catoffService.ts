import axios from 'axios';
import { ONCHAIN_CONFIG } from '../config';
import { ICreateChallenge, IChallengeById, ResultWithError } from '../types/types';

const config = ONCHAIN_CONFIG.devnet;
const baseUrl = config.BackendURL;
const partnerApiKey = config.partnerApiKey;

export const catoffService = {
    async createChallenge(challengeData: ICreateChallenge): Promise<ResultWithError> {
        try {
            const response = await axios.post(`${baseUrl}/challenge`, challengeData, {
                headers: {
                    'x-api-key': partnerApiKey,
                    'Content-Type': 'application/json',
                },
                timeout: 100000,
            });
            return { data: response.data.data, error: null };
        } catch (error) {
            return { data: null, error: error instanceof Error ? error.message : String(error) };
        }
    },

    async getChallengeById(challengeId: number): Promise<ResultWithError> {
        try {
            const response = await axios.get(`${baseUrl}/challenge/${challengeId}`, {
                headers: {
                    'x-api-key': partnerApiKey,
                    'Content-Type': 'application/json',
                },
                timeout: 100000,
            });
            return { data: response.data.data as IChallengeById, error: null };
        } catch (error) {
            return { data: null, error: error instanceof Error ? error.message : String(error) };
        }
    },

    async generateAIDescription(name: string, participationType: string): Promise<ResultWithError> {
        try {
            const response = await axios.post(
                `${baseUrl}/generate-description-x-api-key/`,
                {
                    prompt: name,
                    participation_type: participationType,
                    result_type: 'voting',
                },
                {
                    headers: {
                        'x-api-key': partnerApiKey,
                        'Content-Type': 'application/json',
                    },
                    timeout: 200000,
                }
            );
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: error instanceof Error ? error.message : String(error) };
        }
    },
};
