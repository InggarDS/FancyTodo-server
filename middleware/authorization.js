const { Todo } = require('../models')

function authorization(req, res, next){
    console.log(req.params.id);
    

    Todo.findOne({
        where : {
            id : req.params.id
        }
    })
    .then(result => {
        
        if (result) {
            if (result.UserId === req.userId ){
                return next()

            } else {
                return next({
                    name : 'Unauthorized',
                    errors : [ { message : 'User not authorized'}]
                })
            }
        } else {

            return next({
                name : 'Not Found',
                errors : [ { message : 'user not found'}]
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
           name : err
        })
    })


}


module.exports = authorization;