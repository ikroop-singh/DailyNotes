const jwt=require('jsonwebtoken');
const JWT_SECRET = 'hopewillbesuccessfulloneday';


  const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and id to the request object
    const token=req.header('jwt_token');

    if(!token){
        res.status(401).send({error:'Authenticate using a valid token'})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET );
        req.user=data.user;
        next();

    }catch(error){
        res.status(401).send({error:'Authenticate using a valid token'})
    }
}

module.exports=fetchuser;