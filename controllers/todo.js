const { Todo } = require('../models')

class Controller {

    static read(req, res, next){

        Todo.findAll({
            where : { UserId : req.userId }
        })
        .then((data) => {
            res.status(200).json({
                todos : data
            })
        })
        .catch((err) => {

            return  next( { 
                name : 'Internal Server Error',
                errors : [ { message : err }]
            })
          
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
            res.status(201).json({
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

        Todo.update({
            title : title,
            description : description,
            status : status,
            due_date : due_date
        }, {
            where : { id : +req.params.id }
        })
        .then((data) => {

            Todo.findByPk(data[0])
            .then((dataUpdate) => {

                if(dataUpdate){
                    res.status(200).json({
                        msg : 'sucessfully update',
                        todos : dataUpdate
                    })
                } else {
                    return  next( { name : 'Not Found'} )
                }
            })
            
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