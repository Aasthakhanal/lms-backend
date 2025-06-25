import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

export const generateToken = async (user) => {
try {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    return token;

} catch (error) {
    console.log(error);
    return;
}
}
export const decodeJWt = async(token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded && !decoded._id){
            console.log("Invalid Token Detected!!")
            return;
        }
        const userId = decoded._id;
        const foundUser = await UserModel.findById(userId);
        return foundUser;
        
    } catch (error) {
        console.log(error)        
    }
}

