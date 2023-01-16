// const mongoose = require("mongoose");
const {Schema,model}=require("mongoose")

const SocialmediaAuthSchea = new Schema ({
  name: String,
  email: String,
  gender: String,
  password: String,
});

const  authModel = model("users",SocialmediaAuthSchea)
module.exports = authModel
