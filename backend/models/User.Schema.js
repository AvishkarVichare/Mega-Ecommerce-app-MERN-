import bcrypt from 'bcryptjs';
import AuthRoles from '../utils/authRoles';
import jwt from 'jsonwebtoken';
import config from '../config/index.js'

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name is required"],
            maxLength: [50, "name cannot be greater than 50"],
        },
        email:{
            type: String,
            required: [true, "email is required"],
            unique: [true, "email must be unique"]
        },
        password:{
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password cannot be less than 8"],
            select: false
        },
        role:{
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswordtoken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: String
        },

    },
    {
        timestamps: true
    }
)

// encrypt password
UserSchema.pre('save', async function(next){
    if(this.modified('password')){
        const salt = bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
        next()
    }
    else{
        return next()
    }

})

//compare password method for schema
UserSchema.methods = {

    // compare password 
    comparePasswords: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // get jwt token
    generateJwtToken: async function(){
        const token = jwt.sign({
            id: this._id,
            role: this.role,
        },
        config.JWT_SECRET,//secret
        {
            expiresIn: config.JWT_EXPIRY
        }
        )

        return token;
    }
}



