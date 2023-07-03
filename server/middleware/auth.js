const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    try{
        let token = req.headers("Authorization");
        if(!token){
            return res.status(401).json({message: "No token found"});
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(401).json({message: "No token found"});
    }
}

module.exports = {verifyToken};