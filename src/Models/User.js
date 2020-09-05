const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  authenType: {
    type: String,
    default: "local",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  urlImage: {
    type: String,
  }
});
UserSchema.pre("save", async function (next) {
  try {
    if (this.authenType !== "local") next();
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.password, salt);
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.methods.comparePassword = async function (passwordToCompare) {
  return await bcrypt.compare(passwordToCompare, this.password);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
