import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../utils/generateToken.js';
import { UserModel } from '../models/userModel.js';

export const checkauthorization = async(req,res,next) => {
    try {
        const token = req?.body?.token;
        const decoded = await jwt.verify(token, jwtSecretKey)

        if(!decoded._id){
            res.json({
                success: false,
                message: 'you are Unauthorized!!'
            });
        }
        const user = UserModel.findById(decoded._id);
        if(!user) {
            return res.json({
                success:false,
                message:'Invalid User or User not found!!'
            })
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message,
        })
        
    }
}