const { Todo } = require('../models')

class Controller {

    static read(req, res){

        Todo.findAll()
        .then((data) => {
            res.status(200).json({
                todos : data
            })
        })
        .catch((err) => {
            res.status(500).json({
                error : 'Internal Server Error'
            })
        })
    }

    static create(req, res){
         
        let { title, description, status, due_date } = req.body

        Todo.create({
            title,
            description,
            status,
            due_date
        })
        .then((data) => {
            res.status(201).json({
                msg : 'sucessfully added',
                todos : data
            })
        })
        .catch((err) => {
            res.status(500).json(err)
            
        })

    }

    static update(req, res){

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
                    res.status(404).json({
                        error : 'data not found'
                    })
                }
            })
            
        })
        .catch((err) => {
            res.status(500).json(err)
        })



    }

    static delete(req, res){
        
        Todo.findByPk(+req.params.id)
        .then((data) => {
          
            if (data) {
                res.status(200).json({
                    msg : 'sucessfully delete',
                    todos : data
                })
                return data.destroy();
            } else {
                res.status(404).json({
                    error : 'data not found'
                })
            }
           
        })
        .catch((err) => {
            res.status(500).json(err)
        })


    }

}

module.exports = Controller