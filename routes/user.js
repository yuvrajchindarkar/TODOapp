const router = require("express").Router();
const mongoose = require("mongoose");
const user = require("../models/User")
var bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post('/user/signup', (req, res, next) =>{
    bcrypt.hash(req.body.password, 10,(err, hash) => {
        if(err){
            return res.status(500).json({
                error:"hashingissue"
            })
        }
        else{
            const newUser= new user({
                _id: new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                email:req.body.email
            })

            newUser.save()
            .then(result => {
                res.status(200).json({
                    new_user:result           
                })
            })
            .catch(err => {
                res.status(500).json({
                    error:"postingissue"
                })

            })
        }

    })
})

router.post('/user/login',(req, res, next) => {
    user.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.lenght < 1){
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(!result){
                return res.status(401).json({
                    msg: 'pass not match'
                })
            }
            if(result){
                const token =jwt.sign({
                    username:user[0].username,
                    email:user[0].email
                },
                'thiis is dummy text',
                {
                    expiresIn: "24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    email:user[0].email,
                    token:token
                })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            err:"err"
        })
    })

})



module.exports= router;      