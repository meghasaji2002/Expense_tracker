const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const server = express()
server.use(cors({
    origin:"http://localhost:3000"
}))
require('./database/connection');

server.use('/uploads',express.static('./uploads'));

const bodyParser = require("body-parser");
server.use(bodyParser.json({ limit: "200mb"}));
server.use(bodyParser.text({limit:"200mb"}));
server.use(bodyParser.urlencoded({ limit:"200mb", extended:true}));

server.get('/',(req,res)=>{
    res.send('app running at 5000')
})
const AuthRoute = require('./router/auth-router');
server.use('/auth',AuthRoute);

const ExpenseRoute = require('./router/expense-router');
server.use('/expense',ExpenseRoute);

const DashboardRoute = require('./router/dashboard-router');
server.use('/dashboard',DashboardRoute);

const UserRoute = require('./router/user-router');
server.use('/user',UserRoute);



server.listen(process.env.PORT,()=>{
    console.log(`server running successfully at port number ${process.env.PORT}`);
})