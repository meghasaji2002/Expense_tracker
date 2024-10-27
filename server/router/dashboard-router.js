const express = require('express');
const DashboardRoute = new express.Router();
const expenseModel = require('../models/expenseSchema');
const {  jwtVerify } = require('../constant');

DashboardRoute.get('/expense-graph-data',async (req,res)=>{
    const year = req?.query?.year;
    jwtVerify(req,res,async(userId)=>{
        const list = await expenseModel.find({userId});
        const yearFilter = list.filter((item)=>{
            const thisYear = new Date(item.date).getFullYear();
            return thisYear===Number(year);
        });
        const creditFilter = yearFilter.filter((item)=>{
            return item.type === 'CR';
        });        
        const debitFilter = yearFilter.filter((item)=>{
            return item.type === 'DB';
        });
        const monthFilter = (arr)=>{
            const monthData = [];
            for(let i=0; i<12; i++){
                const thisMonthData = arr.filter(element => {
                    const elementMonth = new Date(element.date).getMonth();
                    return elementMonth=== i;
                });
                const sum = thisMonthData.reduce((acc,item)=>{
                    return acc+item.amount;
                },0);
                monthData.push(sum);
            }
            return monthData;
        }
        const credits = monthFilter(creditFilter);      
        const debits = monthFilter(debitFilter);
        res.json({
            status:200,
            message:"expense list",
            data: {
                credits,debits
            }
        });
    })
});

module.exports = DashboardRoute;