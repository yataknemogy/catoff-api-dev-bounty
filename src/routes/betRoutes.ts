import express from 'express';
import { placeBet } from '../controllers/betController';

const router = express.Router();

router.post('/', placeBet);

export default router;
