const mongoose=require('mongoose');

const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI);
    console.log('MongoDB Connected');
  }
  catch (error){
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports=connectToMongoDB;