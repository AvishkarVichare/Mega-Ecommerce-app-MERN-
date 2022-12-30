import mongoose from "mongoose";
import OrderStatus from "../utils/orderStatus";

const OrderSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                count:{
                    type: Number,
                },
                price:{
                    type: Number,
                }
            }
        ],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    phonenumber:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    coupon:{
        type: Number,
    },
    transactionid:{
        type: String,
    },
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        default: "ORDERED",
    }
   
},
    {
        timestamps: true
    }
)

export default mongoose.model("order", OrderSchema);