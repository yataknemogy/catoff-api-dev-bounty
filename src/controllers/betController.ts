import { Request, Response, NextFunction } from 'express';
import {getBetStatusService, placeBetService} from '../services/betService';
import { IPlaceBet } from '../types/types';
import Joi from 'joi';

const betSchema = Joi.object({
    betAmount: Joi.number().positive().required(),
    currency: Joi.string().valid('USDC', 'SOL', 'BONK', 'SEND').required(),
    challengeID: Joi.number().integer().positive().required(),
    userAddress: Joi.string().required(),
    opponentAddress: Joi.string().optional(),
});

export const placeBet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value: betData } = betSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: 'Invalid bet data', details: error.details });
        }

        const result = await placeBetService(betData as IPlaceBet);

        if (result.error) {
            res.status(500).json({ message: 'Failed to place bet', error: result.error });
        }

        res.status(201).json({ message: 'Bet placed successfully', data: result.data });
    } catch (error) {
        next(error);
    }
};

export const getBetStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const betID = parseInt(req.params.betID, 10);

        if (isNaN(betID)) {
            res.status(400).json({ message: 'Invalid bet ID. Must be a number.' });
        }

        const result = await getBetStatusService(betID);

        if (result.error) {
            res.status(500).json({ message: 'Failed to fetch bet status', error: result.error });
        }

        res.status(200).json({ message: 'Bet status retrieved successfully', data: result.data });
    } catch (error) {
        next(error);
    }
};
