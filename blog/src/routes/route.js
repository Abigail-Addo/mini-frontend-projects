const router = require('express').Router();
const knex = require('../../config/db')
const User = require('../controllers/user');


router.post('/login', User.getUser);

router.post('/createUser', User.createUser)

router.get('/users', User.getAllUsers);





router.get('/sandbox', (req, res) => {
    res.json({message: 'this is a sandbox'})
  });

module.exports = router;