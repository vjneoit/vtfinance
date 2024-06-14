import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    aadharcard: {
        type: String // storing file paths
    },
    user_type: {
        type: Number,
        enum: [0, 1, 2],
        required:true,
        default: 0
    },
    status: {
        type: Boolean,
        required:true,
        default: false
    }
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.allUser || mongoose.model("allUser", AdminSchema);

export default UserModel;
