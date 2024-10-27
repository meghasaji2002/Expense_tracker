const express = require('express');
const AuthRoute = new express.Router();
const jwt = require('jsonwebtoken');

const userModel=require('../models/userSchema');
const { secretKey, generateGuid } = require('../constant');
const { Link, useNavigate } = require('react-router-dom');


AuthRoute.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userData = await userModel.findOne({username,password});
    if(userData){
        const{fullname,userType,guid}=userData;
       
        const token= jwt.sign({userId:guid},secretKey);
        res.json({
            status:200,
            message:"login successful",   
            data:{username,fullname,userType,guid},
            token
        });
       

        
    }
    else{
        
        res.json({
            status:400,
            message:"incorrect username or password",
            
        });
    }
});


AuthRoute.post('/register',async (req,res)=>{
    const {fullname,username,password} = req.body;
    const guid = generateGuid();
    const isUserExisting = await userModel.findOne({username});
    console.log(guid);
    if(isUserExisting){
        res.json({
            status:400,
            message:"username already existing ",   
        });
    }
    else{
        const newUser = new userModel({
            guid,username,fullname,password,userType:"User"
        })
        await newUser.save();
        res.json({
            status:200,
            message:"user created successfully",
            data:{
                guid,username,fullname,userType:"User"
            }
        });
    }
});


module.exports = AuthRoute;