const express=require('express');
const router=express.Router();
const protect=require('../middleware/authMiddleware')
const {getWatchlist,addToWatchList,delfromWatchlist}=require('../Controller/watchlistController');
router.route('/').get(protect,getWatchlist);
router.route("/:id")
    .get(protect,addToWatchList)
    .delete(protect,delfromWatchlist);
module.exports=router;
