import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code:{
        type: String,
        required: [true, "coupon code is required"],
    },
    discount: {
        type: Number,
        default: 0
    },
    active:{
        type: Boolean,
        default: true
    }
    
},
{
    timestamps: true
}
)

export default mongoose.model("coupon", CouponSchema);