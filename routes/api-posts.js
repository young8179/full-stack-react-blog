var express = require('express');
const { route } = require('../app');
var router = express.Router();
const db = require("../models")

//Get all post
router.get('/', function(req, res) {
  db.Post.findAll()
    .then(posts =>{
      res.json(posts)
    })
});

//get 1 post by id
router.get("/:id", (req,res)=>{
  db.Post.findByPk(req.params.id)
    .then(post =>{
      if(post){
        res.json(post)
      }else{
        res.status(404).json({
          error: "post not found"
        })

      }

    })
    }
)

//update post
//put api/v1/posts/101
router.put("/:id", (req,res)=>{
  if(!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published){
    res.status(400).json({
      error: "Please Submit all required fields"
    })
    return
  }
  db.Post.update({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  },{
    where:{
      id: req.params.id
    }
  })
    .then(updated =>{
      if(updated && updated[0]  === 1){
        res.status(202).json({
          success: "Post Updated"
        })

      }else{
        res.status(404).json({
          error: "post not found"
        })
      }
    }) 
})


//create new post
router.post("/",(req,res)=>{
  if(!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published){
    res.status(400).json({
      error: "Please Submit all required fields"
    })
    return
  } 
  db.Post.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  })
    .then(post=>{
      res.status(201).json(post)
    })
})



//delete post
// DELETE /api/v1/posts/101
router.delete("/:id", (req,res)=>{
  db.Post.destroy({
    where:{
      id: req.params.id
    }
  })
    .then(deleted=>{
      if(deleted === 1){
        res.status(202).json({
          success: "Post deleted"
        })
      }else{
        res.status(404).json({
          error: "Post Not Found"
        })
      }
      
    })
})

module.exports = router;
