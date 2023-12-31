import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: 'API route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  
    // Ensure the authenticated user's id matches the id in the request parameters
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account!"));
    }

    // Prepare the fields to update
   // const updatedFields = {};
   try {
    // Check if a new password is provided and hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user's information based on the authenticated user's id
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
      },
     },
      { new: true }
    );

    // if (!updatedUser) {
    //   return next(errorHandler(404, 'User not found'));
    // }

    // Exclude the password field in the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    // Handle any errors
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
     res.clearCookie('access_token');
     res.status(200).json("User Has Been Deleted...");
  } catch (error) {
    next(error);
  }
};

 
//have to debug this part
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};


export const getUser=async(req,res,next)=>{
 try{ 
  const user=await User.findById(req,params.id);

  if(!user)return next(errorHandler(404,"user not found!"));
  const {password:pass,...rest}=user._doc;

  res.status(200).json(rest)
 }catch(error){
 next(error);
 }
}
