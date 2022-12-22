const mongoose = require('mongoose');
const { default: AuthRoles } = require('../utils/authRoles');

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
        }
    }
)

