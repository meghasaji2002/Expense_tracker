const jwt = require('jsonwebtoken');

const secretKey="w7r5DBknpdKuBtGKZpvR6IDUOyNjBHC4";
const generateGuid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const jwtVerify = (req,res,next)=>{
    const token = req.headers['authorization']?.split('Bearer ')[1];

    try{
       const jwtResponse = jwt.verify(token,secretKey);
       next(jwtResponse.userId);

    } catch(err){
        res.status(401).json({
            status:401,
            message:'Authorization Failed ... Please Login'
        })
    }
   
}
module.exports={secretKey,generateGuid,jwtVerify}