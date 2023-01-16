const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  body: String,
  device: { type: String, enum: ["Pc", "Mobile", "TABLET"] },
  userID:String
});

const PostModel = model("post", PostSchema);
module.exports = PostModel;
// "title": "NEM_X4",
//   "body": "Evalution4",
//   "device": "TABLET"