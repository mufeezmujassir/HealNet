const express=require('express');
const router=express.Router();  

const userSignup=require('../controller/userSignup');

router.post('/signup',userSignup);


module.exports=router; 