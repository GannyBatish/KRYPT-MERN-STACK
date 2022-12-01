const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WatchlistSchema=Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    coin:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
}
);
const Watchlist=mongoose.model("Watchlist",WatchlistSchema);

module.exports=Watchlist;