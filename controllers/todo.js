const { Todo, User } = require('../models')

class Controller {

    static read(req, res, next){

        Todo.findAll({
            where : { UserId : req.userId }
        })
        .then((data) => {
            User.findByPk(req.userId)
            .then( user => {

                return res.status(200).json({
                        todos : data,
                        username : user.username        
                })
            })
            .catch( err => {
                return next(err)
            })
            
        })
        .catch((err) => {

            return  next(err)
          
        })
    }

    static findOne(req, res, next){
        Todo.findOne({
            where : { id : req.params.id }
        })
        .then((data) => {
            return res.status(200).json({
                todos : data
            })
        })
        .catch(err => {
            return  next(err)
        })
    }

    static create(req, res, next){
         
        let { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date,
            UserId : req.userId
        })
        .then((data) => {
           return res.status(201).json({
                msg : 'sucessfully added',
                todos : data
            })
        })
        .catch((err) => {
           
            return  next(err)
          
        })

    }

    static update(req, res, next){

        let { title, description, status, due_date } = req.body
     
        
        return Todo.update({
            title : title,
            description : description,
            status : status,
            due_date : due_date
        }, {
            where : { id : +req.params.id },
            returning : true
        })
        .then((data) => {
                        
              if(data){
                   return res.status(200).json({
                        msg : 'sucessfully update',
                        todos : data[1]
                    })

                } else {
                    
                    return  next( { name : 'Not Found'} )
                }
        })
        .catch((err) => {
            
            return  next(err)
          
        })

    }

    static delete(req, res, next){

        Todo.findByPk(+req.params.id)
        .then((data) => {
          
            if (data) {
                res.status(200).json({
                    msg : 'sucessfully delete',
                    todos : data
                })
                return data.destroy();
            } else {
               return  next( { name : 'Not Found'} )
            }
        })
        .catch((err) => {
            
            return  next( { 
                name : 'Internal Server Error',
                errors : [ { message : err }]
            })
          
        })


    }

}

module.exports = Controller