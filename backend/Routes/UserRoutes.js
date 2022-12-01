const express=require('express');
const router=express.Router();
const { registerUser ,loginUser,updateProfile,getProfile}=require('../Controller/UserController');
const protect=require('../middleware/authMiddleware')
router.post('/signup',registerUser);
router.post('/login',loginUser);
router.route('/profile')
                    .get(protect,getProfile)
                    .patch(protect,updateProfile);

module.exports=router;