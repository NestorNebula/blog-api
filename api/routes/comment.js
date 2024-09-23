const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controllers').comment;

router.post('/', controller.postComment);
router.get('/:commentId', controller.getComment);
router.put('/:commentId', controller.udpateComment);
router.delete('/:commentId', controller.deleteComment);

module.exports = router;
