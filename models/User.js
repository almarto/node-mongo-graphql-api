const mongosee = require("mongoose");

const Schema = mongosee.Schema;

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  mobile: Number,
  hobbies: [String]
});

module.exports = mongosee.model("User", UserSchema);
