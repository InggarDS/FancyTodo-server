
const { decodeToken } = require('../helpers/jwt')

function authentication(req, res, next){
    try {

        let decode  = decodeToken(req.headers.access_token)
        req.userId = decode.id
        return next();

    } catch (err){
        
        next(err)
    }

}

module.exports = authentication
