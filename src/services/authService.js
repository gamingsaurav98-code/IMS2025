import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from '../utils/email.js';

const login = async(data)=>{

const user = await User.findOne({email: data.email});

const isPasswordMatch = bcrypt.compareSync(data.password , user.password);

if(!isPasswordMatch) throw {  message: "Incorrect email or password. " };

return {
    id: user._id,
     name: user.name,
     email: user.email,
     phone: user.phone,
     address: user.address,
     roles: user.roles,
};
};


const forgotPassword = async (email) => {
const user = await User.findOne({email});

if(!user) return;




const token = crypto.randomUUID();

await ResetPassword.create({
    userId: user.id,
    token,
});

await sendEmail("ASD",{subject: "TST" , message: "S"});
  return {message: "Reset password link sent successfully. "};
};

const resetPassword = async( userId, token, newPassword ) => {
    const data = await ResetPassword.findOne({
        expiresAt: {$gt: Date.now()},
        isUsed: false,
        userId,
    }).sort({ expiresAt: -1});

 if (!data || data.token != token) {
    throw {statusCode: 400, message:"invalid or expired token. "};

 } 
 if(data.isUsed) {
     throw { statusCode: 400, message: "Token has already been used. " };
 }
 const hashedPassword = bcrypt.hashSync(newPassword);
 
 await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
 });

 await User.findByIdAndUpdate(data.id, {
    isUsed: true,
 });

 return {message: "Password reset successfully. "} ;
};



const register = async(data) => {

    const user = await User.findOne({ email: data.email });

       if (user) throw{ statusCode: 400, message: "user is already exist. "};

    const hashedPassword = bcrypt.hashSync(data.password);
    

return await  User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    address: data.address,
    id: data.id,
    
});


};






export default { register, login, forgotPassword, resetPassword };