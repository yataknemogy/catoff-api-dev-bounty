import { Request, Response } from 'express';
import { createTournamentService, getTournamentByIdService } from '../services/tournamentService';
import { ICreateTournament } from '../types/types';

export const createTournament = async (req: Request, res: Response) => {
    try {
        const tournamentData: ICreateTournament = req.body;
        const result = await createTournamentService(tournamentData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tournament', error });
    }
};

export const getTournamentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await getTournamentByIdService(Number(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tournament by ID', error });
    }
};
