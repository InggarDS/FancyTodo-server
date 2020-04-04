const {User, Todo, UserTodo} = require('../models')


class controller {
    
    static create(req, res, next){

            let newData = { UserId, TodoId } = req.body
            UserTodo.create({
                UserId,
                TodoId
            })
            .then(result => {
                return res.status(200).json({
                    UserTodos : result
                })
            })
            .catch(err => {
                return next(err)
            })

    }
}

module.exports = controller