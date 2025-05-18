// //user.js


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     // 🔐 6-digit code-based password reset
//   resetCode: {
//     type: String,
//   },
//   resetCodeExpiry: {
//     type: Date,
//   },

//     verificationToken: String,
//     verificationTokenExpiresAt: Date,


// })

// export const User = mongoose.model("User", userSchema); 


//user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  resetCode: String,
  resetCodeExpiry: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date
});

const User = mongoose.model("User", userSchema);
export default User;

