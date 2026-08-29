import Bcrypt from 'bcrypt'
import User, {IUser} from '../models/User.js'
import {RegisterInput} from '../validators/auth.validator.js'
export const registerUser = async (input : RegisterInput) =>{
    const {name , email ,password } = input ;
    //making sure the email has no spaces 
    const normalizedEmail = email.trim().toLowerCase()
    const exsistingUser = await User.findOne({email:normalizedEmail})
    if(exsistingUser){
        throw new Error("Email already registered");
    }
    const hashedPassword =await Bcrypt.hash(password, 12);
   const user:IUser = await User.create({
    name:name.trim(),
    email:normalizedEmail,
    password :hashedPassword
   }) 
    return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}
