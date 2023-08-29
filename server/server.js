const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

require('./db/config');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//Exporting routes
const studentRouter = require('./routes/student')

//Routes
app.use('/', studentRouter)

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
})