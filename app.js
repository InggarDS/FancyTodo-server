require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router, errorHandler)

app.listen(PORT, () => {
    console.log(`connecting to ${PORT}`);
});