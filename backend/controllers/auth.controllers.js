import User from '../models/User.Schema';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import CookieOptions from '../utils/cookieOptions';


/*********
* @SIGNUP
* @route http:/localhost:4000/api/auth/signup
* @parameters name, email, password
* @returns user object
*********/
export const signupController = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password)
        throw new CustomError("Please fill all fieilds", 400)

    const existingUser = User.find({email});

    if(existingUser)
        throw new CustomError("User already exists", 400)

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateJwtToken();

    user.password = undefined;

    res.cookie("token", token, CookieOptions);

    res.status(200).json({
        success: true,
        token,
        user
    })
        
})
