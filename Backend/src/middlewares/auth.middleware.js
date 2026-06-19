const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.model');


async function authUser(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(409).json({
            message:"Token Not Provided"
        });
    }
    const isTokenBlacklisted = await blacklistTokenModel.findOne({
        token
    });
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"toke in Invalid"
        });
    }


    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message:"Invalid Token"
        })
    }

}

module.exports = {authUser}