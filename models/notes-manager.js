const mongoose=require("mongoose");

const itemsSchema=new mongoose.Schema({
  title: String,
  content: String
});
const Entry=mongoose.model("Entry",itemsSchema);
module.exports=Entry;
