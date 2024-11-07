import { Request, Response } from 'express';
import { createChallengeService, getChallengeByIdService } from '../services/challengeService';
import { ICreateChallenge } from '../types/types';

export const createChallenge = async (req: Request, res: Response) => {
    try {
        const challengeData: ICreateChallenge = req.body;
        const result = await createChallengeService(challengeData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating challenge', error });
    }
};

export const getChallengeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await getChallengeByIdService(Number(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenge', error });
    }
};
