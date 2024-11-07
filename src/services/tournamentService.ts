import axios from 'axios';
import { ONCHAIN_CONFIG } from '../config';
import { ICreateTournament, ITournamentById, ResultWithError } from '../types/types';
import logger from '../logger';
import { GenericError } from '../errors/errorHandling';

const baseUrl = ONCHAIN_CONFIG.devnet.BackendURL;
const partnerApiKey = ONCHAIN_CONFIG.devnet.partnerApiKey;

export const createTournamentService = async (tournamentData: ICreateTournament): Promise<ResultWithError> => {
    try {
        const response = await axios.post(`${baseUrl}/tournament`, tournamentData, {
            headers: { 'x-api-key': partnerApiKey, 'Content-Type': 'application/json' },
            timeout: 100000,
        });
        return { data: response.data.data, error: null };
    } catch (error) {
        logger.error(`Error creating tournament: ${error}`);
        throw new GenericError(error instanceof Error ? error.message : 'Unknown error', 500);
    }
};

export const getTournamentByIdService = async (tournamentId: number): Promise<ResultWithError<ITournamentById>> => {
    try {
        const response = await axios.get(`${baseUrl}/tournament/${tournamentId}`, {
            headers: { 'x-api-key': partnerApiKey, 'Content-Type': 'application/json' },
            timeout: 100000,
        });
        return { data: response.data.data as ITournamentById, error: null };
    } catch (error) {
        logger.error(`Error fetching tournament by ID: ${error}`);
        throw new GenericError(error instanceof Error ? error.message : 'Unknown error', 500);
    }
};
