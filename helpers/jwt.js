const jwt = require('jsonwebtoken')

function generateToken(data){
    return jwt.sign(data, process.env.SECRET)
}

module.exports = generateToken;