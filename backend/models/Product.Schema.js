import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "product name is required"],
        trim: true,
        maxLength: [120, "product name should not be more than 120"]
    },
    
},
{
    timestamps: true
}
)

export default mongoose.model("product", ProductSchema);