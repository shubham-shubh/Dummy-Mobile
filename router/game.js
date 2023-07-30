const express=require("express");
const router=express.Router();
// router.route("/").get((req,res)=>{
//   res.render("games");
// });
router.route("/").get((req,res)=>{
  res.render("simon");
});
// router.route("/guess").get((req,res)=>{
//   res.render("Guess");
// });
module.exports=router;
