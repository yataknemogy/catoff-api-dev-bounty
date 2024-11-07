import { Request, Response } from 'express';
import { generateAIDescriptionService } from '../services/descriptionService';

export const generateAIDescription = async (req: Request, res: Response) => {
    try {
        const { name, participationType } = req.body;
        const result = await generateAIDescriptionService(name, participationType);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error generating AI description', error });
    }
};
