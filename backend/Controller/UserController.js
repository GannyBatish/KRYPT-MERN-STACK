const asyncHandler=require('express-async-handler');
const generateToken=require('../token/genToken');
const User = require('../Schema/UserSchema');

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name || !email || !password)
    {
        res.status(404);
        throw new Error("Please fill all the Required Fields");
    }
    if(!email.includes("@gmail.com"))
    {
        res.status(404);
        throw new Error("Invalid Email Address");
    }
    if(password.length<8)
    {
        res.status(404);
        throw new Error("Password must consists of less than 8 characters");
    }
    const userExists=await User.findOne({email});
    if(userExists)
    {
        res.status(404);
        throw new Error("User already exists");
    }
    const user=await User.create({
        name,email,password,pic
    });
    if(user)
    {
        res.status(201).json({
            token:generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error("User Not Registered");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

const updateProfile=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user._id);
    if(user)
    {
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.pic=req.body.pic || user.pic;
        if(req.body.password)
        {
            user.password=req.body.password;
        }
        const updatedUser=await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id),
        });
    }
    else{
        res.status(404);
        throw new Error("User Not Found");
    }
})
const getProfile=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user._id);
    if(user)
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }
    else
    {
        res.status(404);
        throw new Error("User Not Found");
    }
})
module.exports={registerUser,loginUser,updateProfile,getProfile};