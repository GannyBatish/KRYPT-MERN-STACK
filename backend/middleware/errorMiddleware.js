const notFound=(req,res,next)=>{
    // const error=new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({
        message:`Error : Not found ${req.originalUrl}`
    });
    next(error);
};

const errorHandler=(err,req,res,next)=>{
    // const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(res.statusCode);
    res.json({
        message:err.message,
    });
};
module.exports={notFound,errorHandler};