import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Invalid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  }, {
    timestamps: true,
  });


const User = mongoose.model("Users", userSchema);

export default User;

/* userModel.js :
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Invalid email address'],
    },
    
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  }, {
    timestamps: true,
  });


const User = mongoose.model("Users", userSchema);

export default User;*/ 