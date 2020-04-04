const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decryptPassword } = require('../helpers/bcrypt')
const { Op } = require('sequelize')
const { OAuth2Client } = require('google-auth-library')

class Controller {

    static read(req, res, next){

        User.findAll()
        .then((data) => {
           
                return res.status(200).json({
                        
                    users : data,
                          
                })
          
            
        })
        .catch((err) => {

            return  next(err)
          
        })
    }

    static signup(req, res, next){
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
            return  next(err)
        })
    }

    static signin(req, res, next){

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
            
            if (data){

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
                    return next({
                        name : 'bad request',
                        errors : [{  message : 'invalid password/email' }]
                    })
                }
            } else {

                return next({
                    name : 'bad request',
                    errors : [{  message : 'invalid password/email' }]
                })

            }
        })
        .catch((err) => {
            return  next(err)
        })

    }

    static googleSign(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email;

        client.verifyIdToken ({
            
            idToken : req.body.id_token,
            audience : process.env.CLIENT_ID
        })
        .then(result => {
            email = result.payload.email

            return User.findOne({
                where : { email }
            })
            .then(data => {
                if (data){
                    
                    let user = {
                        id:data.id,
                        username : data.name,
                        email : data.email,
                    }

                    let token = generateToken(user)

                    res.status(200).json({
                        message : 'login success !!',
                        'id' : user.id,
                        'username' : user.username,
                        'email' : user.email,
                        'access_token' : token
                    })
                } else {
                    let newUser = {
                        username : result.payload.name,
                        email : result.payload.email,
                        password : 'Google'
                    }

                    return User.create(newUser)
                    .then(data => {

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
                    .catch(err => {
                        next(err)
                    })
                }
            })   
        })
    }

}

module.exports = Controller;