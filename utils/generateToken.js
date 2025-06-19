import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
export const jwtSecretKey = "jbejfcewbafcoefu";

export const generateToken = async (user) => {
try {
    const token = jwt.sign(user, jwtSecretKey);

    return token;

} catch (error) {
    console.log(error);
    return;
}
}
export const decodeJWt = async(token) => {
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
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

