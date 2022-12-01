const Watchlist=require('../Schema/watchlistSchema');
const asyncHandler=require('express-async-handler');

const getWatchlist=asyncHandler(async(req,res)=>{
    const watchlist=await Watchlist.find({user:req.user._id});
    res.json(watchlist);
})

const addToWatchList=asyncHandler(async(req,res)=>{
    const coinToAdd=req.params.id;
    const coinExists=await Watchlist.findOne({user:req.user._id,coin:coinToAdd});
    if(coinExists)
    {
        res.status(401);
        throw new Error("Cannot add more than one coin of same type");
    }
    try{
            const coin=new Watchlist({user:req.user._id,coin:coinToAdd});
            const addedCoin=await coin.save();
            res.status(201).json(addedCoin);
    }catch(error)
    {
            res.status(404);
            throw new Error(error.message);
    }
})
const delfromWatchlist=asyncHandler(async(req,res)=>{
    const coinToDel=req.params.id;
    const coin=await Watchlist.findOne({user:req.user._id,coin:coinToDel});
    if(!coin)
    {
        res.status(401);
        throw new Error("Coin Doesnot exist");
    }
    try{
            await coin.remove();
            res.status(201).json(coin);
    }catch(error)
    {
            res.status(404);
            throw new Error(error.message);
    }
})
module.exports={getWatchlist,addToWatchList,delfromWatchlist};