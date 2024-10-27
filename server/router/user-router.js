const express = require('express');
const UserRoute = new express.Router();
const userModel = require('../models/userSchema');
const { jwtVerify } = require('../constant');
const multerConfig = require('../multerMiddleware');




UserRoute.get('/',async (req,res)=>{
    jwtVerify(req,res,async()=>{
        const list = await userModel.find({});
        res.json({
            status:200,
            message:"users list",
            data:list
        });
    })
});

UserRoute.put('/',multerConfig.single('profile'),async (req,res)=>{
    jwtVerify(req,res,async(userId)=>{        
        const {fullname} = req.body;
        const profile = req?.file?.filename;
        userModel.updateOne({guid:userId},{$set:{fullname,profile}}).then((doc)=>{
            res.json({
                status:200,
                message:"user updated successfully",
                data:{
                    guid:userId,fullname,profile
                }
            });
        });
    })
});

UserRoute.post('/type',async (req,res)=>{
    jwtVerify(req,res,async()=>{        
        const {guid,userType} = req.body;
        
        userModel.updateOne({guid},{$set:{userType}}).then((doc)=>{
            res.json({
                status:200,
                message:"userType updated successfully",
                data:{
                    guid,userType
                }
            });
        });
    })
});

UserRoute.delete('/',async (req,res)=>{
    jwtVerify(req,res,async()=>{        
        const {guid} = req.body;
        
        userModel.deleteOne({guid}).then((doc)=>{
            res.json({
                status:200,
                message:"user deleted successfully",
                data:{
                    guid
                }
            });
        });
    })
});




module.exports = UserRoute;