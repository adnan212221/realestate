const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./db/connectDb');
const router = require('./route/user.routes');
const cors = require('cors')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.use('/api/user', router)
app.listen(port, ()=>{
    connectDb();
    console.log(`Server is running on port ${port}`)
})