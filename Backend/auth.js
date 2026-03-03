import express from "express"
import JWT from "jsonwebtoken"
export const auth = (req, res, next) => {
    const authheadertoken = req.headers.authtoken;

    if(!authheadertoken || !authheadertoken.startsWith('Bearer')){
        return res.status(404).json({
            msg: "Token Not Found!"
        })
    }

    const token = authheadertoken.split(' ')[1];

    try {
        
        const jettoken = JWT.verify(token,process.env.JWT_SECRET);

        req.userId = jettoken.userId;

        next();
    } catch (error) {
        return res.status(404).json({
            msg: error.message
        })
    }
}
