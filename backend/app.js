const express =require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const userRouter = require('./router/user');
const claimHistoryRouter = require('./router/claimHistory');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log(" Connected to MongoDB Atlas");
})
.catch((err) => {
    console.error(" MongoDB connection error:", err);
});


//Route setup
app.use("/user",userRouter);
app.use('/claim',claimHistoryRouter);

//start the server
app.listen(port, () => {
        console.log(` Server is running on port ${port}`);
    });
