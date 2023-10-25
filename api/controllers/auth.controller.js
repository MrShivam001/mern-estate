import User from "../models/user.model.js";
import { errorHandler } from "../util/error.js";

export const signup=async(req,res,next)  =>{
   const{username,email,password}=req.body;
   const hashedPassword=bcryptjs.Sync(password,10);
   const newUser=new User({username,email,password:hashedPassword});
   try {
    await newUser.save();
   res.status(201).json('User created successfully');
   } catch (error) {
   // res.status(500).json(error.message);
   next(error);
   //manual error creation and error handling
   //next(errorHandler(550,'error from the function')); 
   }
   
};