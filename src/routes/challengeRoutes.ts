import express from 'express';
import { createChallenge, getChallengeById } from '../controllers/challengeController';

const router = express.Router();

router.post('/', createChallenge);
router.get('/:id', getChallengeById);

export default router;
