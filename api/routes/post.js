const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controllers').post;

router.get('/', controller.getPosts);
router.post('/', controller.postPost);
router.get('/:postId', controller.getPost);
router.put('/:postId', controller.updatePost);
router.delete('/:postId', controller.deletePost);

module.exports = router;
