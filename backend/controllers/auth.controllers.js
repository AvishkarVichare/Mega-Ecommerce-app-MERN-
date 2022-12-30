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

    const existingUser = await User.find({email});

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
        message: "created user",
        user
    })
        
})


/*********
* @LOGIN
* @route http:/localhost:4000/api/auth/login
* @parameters email, password
* @returns user object
*********/
export const loginController = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password)
        throw new CustomError("Please fill all fieilds", 400);

    const user = await User.find({email}).select("+password");

    if(!user)
        throw new CustomError("Invalid credentials", 400)

    const isPasswordMatched = await user.comparePasswords(password);

    if(isPasswordMatched){
        const token = user.generateJwtToken();
        user.password = undefined;
        res.cookie("token", token, CookieOptions);
        res.status(200).json({
            success: true,
            token,
            message: "logged in user",
            user
        })
    }
    else{
        throw new CustomError("Invalid credentials", 400)
    }
})


/*********
* @LOGOUT
* @route http:/localhost:4000/api/auth/logout
* @parameters NA
* @returns message logged out
*********/
export const logoutController = asyncHandler(async(_req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

