const express = require('express');
const ExpenseRoute = new express.Router();
const expenseModel = require('../models/expenseSchema');
const { generateGuid, jwtVerify } = require('../constant');


ExpenseRoute.post('/',async (req,res)=>{
    jwtVerify(req,res,async(userId)=>{
        const {date,time,type,amount,comment} = req.body;
        const guid = generateGuid();
        const checkExisting = await expenseModel.findOne({date,time,type,amount,userId});
        if(checkExisting){
            res.json({
                status:400,
                message:"expense already existing",   
            });
        }
        else{
            const newExpense = new expenseModel({
                guid,date,time,type,amount,comment,userId
            })
            await newExpense.save();
            res.json({
                status:200,
                message:"expense created successfully",
                data:{
                    guid,date,time,type,amount,comment
                }
            });
        }
    })
   
});

ExpenseRoute.get('/',async (req,res)=>{
    jwtVerify(req,res,async(userId)=>{
        const list = await expenseModel.find({userId});
        res.json({
            status:200,
            message:"expense list",
            data:list.sort((a,b)=>{
                const dateTimeA = new Date(a.date + 'T' + a.time).getTime();
                const dateTimeB = new Date(b.date + 'T' + b.time).getTime();
                return dateTimeB-dateTimeA;
            })
        });
    })
});

ExpenseRoute.put('/',async (req,res)=>{
    jwtVerify(req,res,async(userId)=>{
        const {guid,date,time,type,amount,comment} = req.body;
        expenseModel.updateOne({guid,userId},{$set:{date,time,type,amount,comment}}).then((doc)=>{
            res.json({
                status:200,
                message:"expense updated successfully",
                data:{
                    guid,date,time,type,amount,comment
                }
            });
        });
    })
    
});

ExpenseRoute.delete('/',async (req,res)=>{
    jwtVerify(req,res,async(userId)=>{
        const {guid,date,time,type,amount,comment} = req.body;
        expenseModel.deleteOne({guid,userId}).then((doc)=>{
            if(doc.deletedCount===1){            
                res.json({
                    status:200,
                    message:"expense deleted successfully",
                    data:{
                        guid,date,time,type,amount,comment
                    }
                });
            };
       });
    })
  
});

module.exports = ExpenseRoute;