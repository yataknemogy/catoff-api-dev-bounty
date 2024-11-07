import { Request, Response } from 'express';
import { createTransactionService } from '../services/transactionService';
import { ICreateTransaction } from '../types/types';

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const transactionData: ICreateTransaction = req.body;
        const result = await createTransactionService(transactionData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};
