require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    
    if (err.name === "SequelizeValidationError"){
        let errors = err.errors.map(el => {
            return { message : el.message }
        })

        return res.status(400).json({
            type : 'bad request',
            errors : errors 
        })
    } else if (err.name == "Unauthorized"){
        
        res.status(404).json({
            type : 'bad request',
            errors : err.errors
        })
    } else if (err.name == "Not Found"){
        res.status(404).json({
            type : 'bad request',
            errors : err.errors
        })
     } else if (err.name == "bad request"){
            res.status(400).json({
                type : 'bad request',
                errors : err.errors
        })
    } else if (err.name = "JsonWebTokenError") {
        return res.status(400).json({
            type : 'bad request',
            errors : [{ message : 'Invalid Token !!' }]   
        })
    } else {
        return res.status(500).json({
            type : "Internal Server Error",
            error : err.errors
        })
    }


})

app.listen(PORT, () => {
    console.log(`connecting to ${PORT}`);
});