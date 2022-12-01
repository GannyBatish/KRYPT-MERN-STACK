const express=require('express');
const connectToMongoDB=require('./db');
const userRoutes=require('./Routes/UserRoutes');
const watchlistRoute=require('./Routes/watchlistRoute');
const dotenv=require('dotenv');
const cors=require('cors');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');
dotenv.config();

const app=express();
connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use('/auth',userRoutes);
app.use('/watchlist',watchlistRoute);
app.use(errorHandler);
app.use(notFound);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}/`);
})