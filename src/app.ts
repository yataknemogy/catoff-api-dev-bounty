import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import challengeRoutes from './routes/challengeRoutes';
import descriptionRoutes from './routes/descriptionRoutes';
import transactionRoutes from './routes/transactionRoutes';
import 'express-async-errors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/api/challenges', challengeRoutes);
app.use('/api/descriptions', descriptionRoutes);
app.use('/api/transactions', transactionRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
