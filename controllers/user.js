const { User } = require('../models');
const generateToken = require('../helpers/jwt');
const { decryptPassword } = require('../helpers/bcrypt')
const { Op } = require('sequelize')

class Controller {

    static signup(req, res){
        let { username, password, email } = req.body

        User.create({
            username,
            password,
            email
        })
        .then((data) => {
            let user =  {
                id : data.id,
                username : data.username,
                email : data.email
            }

            let token = generateToken(user);

            res.status(201).json({
                message : 'success add user !!',
                'id' : data.id,
                'username' : data.username,
                'email' : data.email,
                'access_token' : token
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    
    }

    static signin(req, res){

        User.findOne({
            where : { 
                [Op.or] : {
                   username : {
                       [Op.eq] : req.body.username
                   },
                   email : {
                       [Op.eq] : req.body.email
                   }
                }
             }
        })
        .then((data) => {
            console.log(data);
            
            if(data){

                let compare = decryptPassword(req.body.password, data.password)
                if (compare){
                    
                    let user =  {
                        id : data.id,
                        username : data.username,
                        email : data.email
                    }
        
                    let token = generateToken(user);
        
                    res.status(201).json({
                        message : 'login success !!',
                        'id' : data.id,
                        'username' : data.username,
                        'email' : data.email,
                        'access_token' : token
                    })
                    
                } else {
                    res.status(400). json({
                         message : 'invalid password/email'
                    })
                }
            } else {

                res.status(400). json({
                    message : 'invalid password/email'
                })

            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })

    }

}

module.exports = Controller;