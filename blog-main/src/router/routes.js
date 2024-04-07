const router = require('express').Router();
const knex = require('../../config/database')
const User = require('../controllers/user');


router.post('/login', (req, res) => {User.loginUser()});
router.post('/sign-up', User.createUser)


router.get('/sandbox', (req, res) => {
  res.json({message: 'this is a sandbox'})
});

router.get('/users', User.getAllUsers);

module.exports = router;