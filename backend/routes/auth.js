const express = require('express');
const router = express.Router();
const Users = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fethchuser')
const JWT_SECRET = 'hopewillbesuccessfulloneday'

// 1. route  for signup  
router.post('/api/auth/createuser', [
     body('name', 'Enter a valid name').isLength({ min: 3 }),
     body('email', 'enter a valid email').isEmail(),
     body('password', 'password must be of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
     let success=false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ success,errors: errors.array() })
     }
     try {
          //checking weather user name is unique or not  

          let unique_user = await Users.findOne({ email: req.body.email });
          if (unique_user) {
               return res.status(400).json({success, error: 'user with this email already exists' })
          }

          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(req.body.password, salt);

          const userdata = Users({
               name: req.body.name,
               email: req.body.email,
               password: hash
          }
          )
          const data = {
               user: {
                    id: userdata.id
               }
          }
          userdata.save().then(() => {
               success=true;
               const auth_jwt = jwt.sign(data, JWT_SECRET);
               res.send({success,auth_jwt});
          })

     }

     catch (error) {
          res.status(500).send(success,"some error occured")
          console.error(error.message);
     }

})

// 2. route for login 

router.post('/api/auth/login', [
     body('email', 'enter a valid email').isEmail(),
     body('password', 'Password cannot be blank').exists()
], async (req, res) => {
     let success=false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }

     const { email, password } = req.body;

          try{

          
          let user_exists = await Users.findOne({ email });
          if (!user_exists) {
               success=false;
               return res.status(400).json({success, error: 'Invalid credentials' });
          }
          const passwordCompare =await bcrypt.compare(password, user_exists.password);
          if (!passwordCompare) { 
               success=false;
               return res.status(400).json({success, error: 'Invalid credentials' });
          }
          const data = {
               user: {
                    id:user_exists.id
               }
          }
          success=true;
          const auth_jwt = jwt.sign(data, JWT_SECRET);
          res.json({success,auth_jwt});

     }catch(error){
          console.error(error.message)
          res.status(500).send("some error occured!")
     }  
})         
// 3. route for fetching user using post 
router.post('/api/auth/getuser',fetchuser,async (req,res)=>{
     
     try{
          const userid=req.user.id;
          const user=await Users.findById(userid).select('-password');
          res.send(user);
     }catch(error){
          console.error(error.message)

            res.status(500).send('some error occured')
     }
          
});

module.exports = router;
