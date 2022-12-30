import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        trim: true,
        maxLength: [120, "product name should not be more than 120"]
    },
    name: {
        type: Number,
        required: [true, "price  is required"],
        maxLength: [5, "price should not more than 5 digits"]
    },
    name: {
        type: String,
        required: [true, "product Description is required"],
        // use some form of editor for node js- assignment
    },
    photos: [
        {
            secured_url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    collectioid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection"
    }

},
    {
        timestamps: true
    }
)

export default mongoose.model("product", ProductSchema);