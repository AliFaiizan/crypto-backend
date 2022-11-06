const jwt= require('jsonwebtoken');

module.exports.GenerateToken=(payload,duration)=>{
    return jwt.sign(payload,process.env.TOKEN_SECRET,{
        expiresIn:duration
    })
}

module.exports.GenerateAuthToken=(payload,duration) => { 
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: duration,
    });
 }