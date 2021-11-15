const express = require('express');
const router = express.Router();

const {allUsers, createUser, loginUser, oneUser, deleteUser} = require('../controllers/auth')

router.route('/').get(allUsers).post(createUser);
router.route('/login').post(loginUser);
router.route('/:id').get(oneUser).delete(deleteUser);

module.exports = router;