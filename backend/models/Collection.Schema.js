import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "collection name is required"],
        trim: true,
        maxLength: [120, "collection name should not be more than 120"]
    }
},
{
    timestamps: true
}
)

export default mongoose.model("collection", CollectionSchema);