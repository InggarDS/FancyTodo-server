
const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next){
    try {

        let decode  = decodeToken(req.headers.access_token)
        req.userId = decode.id

        User.findOne({
            where : {
                id : decode.id
            }
        })
        .then( result => {

            if( result ){
                req.userId = result.id
                return next();

            } else {

                return next({
                    name : 'Not Found',
                    errors : [ { message : 'user not found'}]
                })
            }
        })
        .catch(err => {
            return next({
                name : 'Unauthorized',
                errors : [ { message : 'User not authenticated'}]
            })
        })
      

    } catch (err){
        
       return next(err)
    }

}

module.exports = authentication
