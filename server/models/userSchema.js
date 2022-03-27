import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, `Please enter First name`],
      maxlength: [15, `Your name should be below 16 characters`],
      minlength: [4, `Your name should be atleast 4 characters`],
    },
    lname: {
      type: String,
      required: [true, `Please enter Last name`],
      maxlength: [15, `Your last name should be below 16 characters`],
      minlength: [3, `Your last name should be atleast 3 characters`],
    },
    role: {
      type: String,
      required: [true, `Please enter your role`],
    },
    email: {
      type: String,
      required: [true, `Please enter Email Id`],
      validate: [validator.isEmail, `Please enter a vaid email id`],
      unique: true,
    },
    password: {
      type: String,
      required: [true, `Please enter password`],
      select: false,
      minlength: [6, `Your password should be atleast 6 characters`],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timeStamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.generateJwToken = async function () {
  return jwt.sign({ user: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  const comparedPass = await bcrypt.compare(password, this.password);
  return comparedPass;
};

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
