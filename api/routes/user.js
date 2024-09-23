const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controllers').user;

router.get('/:userId', controller.getUser);
router.put('/:userId', controller.updateUser);
router.get('/:userId/posts', controller.getUserPosts);

module.exports = router;
