import express from 'express';
import * as vocabBuilder from '../controllers/vocabController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/words', verifyToken, vocabBuilder.list_all_words);
router.post('/words', verifyToken, vocabBuilder.create_a_word);
router.get('/words/:wordId', verifyToken, vocabBuilder.read_a_word);
router.put('/words/:wordId', verifyToken, vocabBuilder.update_a_word);
router.delete('/words/:wordId', verifyToken, vocabBuilder.delete_a_word);

export default router;