const express=require("express");
const router=express.Router();
const Item=require("../models/to-do-list");
const Entry=require("../models/notes-manager")
const date=require("../date");
const _=require("lodash");
router.route("/").get((req,res)=>{
  res.render("game",{key1: "TO-DO-LIST",key2: "NOTES HANDLER",key3: "notes"});
});
router.route("/to-do-list").get(async(req,res)=>{
  await Item.find()
.then(function (models) {
res.render("to-do-list",{kindofday: date(),list:models});
})
.catch(function (err) {
console.log(err);
});
});
router.post("/to-do-list",async function(req,res){
 const itemName = req.body.todo;

 const newItem = new Item({
    name: itemName
 });
 await newItem.save();
 res.redirect('/notes/to-do-list');
});
router.post("/to-do-list/delete",async function(req,res){
  const id=req.body.checkbox;
  await Item.deleteOne({ _id: id}).then(result => {
   console.log(result);
});
 res.redirect("/notes/to-do-list");
});

/////for notes manager
const homeStartingContent = "Welcome you all to my notes manager! Here you can store notes.";
router.route("/notesHandler").get(async function(req,res){
 await Entry.find().then(function (models) {
    res.render("Notes_handler/home",{key:"Home",content:homeStartingContent,important:models});}).catch(function (err) { console.log(err);
});
});

router.route("/notesHandler/compose").get(async function(req,res){
     res.render("Notes_handler/compose",{key:"Compose"});
}).post(async function(req,res){
 const blog={
  title: req.body.title,
  content: req.body.info
}
const newBlog = new Entry({
   title: blog.title,
   content: blog.content
});
newBlog.save();
  res.redirect("/notes/notesHandler");
});

router.route("/notesHandler/update").get(async function(req,res){
   res.render("Notes_handler/update",{key: "Delete"});
}).post(async function(req,res){
 const day=req.body.update;
 await Entry.deleteOne({ title: day}).then(result => {
  console.log(result)
});
 res.redirect("/notes/notesHandler");
})

router.get("/notesHandler/:xyz",async function(req,res){
    const extra=_.lowerCase(req.params.xyz);
   await Entry.find().then(function (models) {
     for(let i=0;i<models.length;i++)
       {
          if(extra===models[i].title)
            res.render("Notes_handler/indiv",{title:models[i].title, content:models[i].content});
       }

   })
   .catch(function (err) {
     console.log(err);
  });
});
module.exports=router;
