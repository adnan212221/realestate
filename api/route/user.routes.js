const express = require('express');
const { signup, signin, google } = require('../controller/user.controller');


const router = express.Router();

router.get('/ad', (req,res)=>{
    res.send('Hello from ad route')
})

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/google', google)


module.exports = router