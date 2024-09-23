const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controllers').auth;

router.post('/signup', controller.signUp);
router.post('/login', controller.logIn);

module.exports = router;
