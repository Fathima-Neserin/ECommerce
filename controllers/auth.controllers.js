const { token } = require("morgan");
const { hashPassword, comparePassword } = require("../helpers/auth.helpers");
const Users = require("../models/users.models");
const jwt = require("jsonwebtoken");

exports.registerController = async(req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        // validation
        if(!name || !email || !password || !phone || !address){
            return res.send({error: "All Fields are Required "})
        }
        // user already exists
        const existingUser = await Users.findOne({email});

        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already registered, Please login"
            })
        }
        // register user
        const hashedPassword = await hashPassword(password);

        // save
        const newUser = await Users.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).send({
            success:true,
            message:"Registration done",
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in Registration",
            error
        })
     }}

     exports.loginController = async(req, res) => {
        try {
            const {email, password} = req.body;
            // validation
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message:"Invalid Email or Password"
                })}
            const user = await Users.findOne({email});
            if(!user){
                return res.status(400).send({
                    success:false,
                    message: "Email is not registered"
                })}
            const matched = await comparePassword(password, user.password);
           if(!matched){
            return res.status(404).send({
                success:true,
                message:"Incorrect Password"
            })}     
           // token
           const token = await jwt.sign({_id:user._id},
             process.env.JWT_SECRET,
            {expiresIn: "10d"})

            res.status(200).send({
               success:true,
               message: "Login success",
               user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
               },
               token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error in Login",
                error
            })
            
        }
     }