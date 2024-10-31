import express from 'express';
import * as vocabBuilder from '../controllers/vocabController.js';

const router = express.Router();

router.get('/words', vocabBuilder.list_all_words);
router.post('/words', vocabBuilder.create_a_word);
router.get('/words/:wordId', vocabBuilder.read_a_word);
router.put('/words/:wordId', vocabBuilder.update_a_word);
router.delete('/words/:wordId', vocabBuilder.delete_a_word);

export default router;