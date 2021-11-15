const express = require('express');
const router = express.Router();

const {allChapters, createChapter, oneChapter, updateChapter, deleteChapter} = require('../controllers/chapters')

router.route('/').get(allChapters).post(createChapter);
router.route(':id').get(oneChapter).put(updateChapter).delete(deleteChapter);

module.exports = router;