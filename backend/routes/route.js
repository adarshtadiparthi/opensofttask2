const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

/**Import controllers */
const Appcontroller = require('../controllers/Appcontroller');

/**POST ROUTES */
//Register user
router.route('/signup').post(Appcontroller.signup);

//Login user
router.route('/login').post(Appcontroller.login);

/**GET ROUTES */
//User Dashboard
router.route('/user/:username').get(authenticateToken , Appcontroller.getUser);


module.exports = router;
