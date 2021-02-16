const express = require('express');
const BlogPost = require('../models/blogpost');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all blog posts
router.get('/api/blog', async (req, res) =>{

  try{
    const posts = await BlogPost.find();

    res.send(posts);
  }
  catch(error){
    res.status(500).send();
  }

});

// Get specific blog post
router.get('/api/blog/:id', async (req, res) =>{

  const _id = req.params.id;

  try{
    const posts = await BlogPost.find();

    if(posts.length === 0){
      return res.status(404).send();
    }

    if(!posts[_id]){
      return res.status(404).send({error: 'No blog post here'});
    }

    res.send(posts[_id]);
  }
  catch(error){
    res.status(500).send();
  }

});

// Add post to database
router.post('/api/blog', auth,  async (req, res) =>{
  const blog = new BlogPost({
    ...req.body,
  });

  try{
      await blog.save();
      res.status(201).send(blog);
  }
  catch(e){
      res.status(400).send(e);
  }
});

// Remove a blog from the database
router.delete('/api/blog/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  try{

      const blog = await BlogPost.findOneAndDelete({
          _id, // equal to _id: _id
      });

      if(!blog){
          return res.status(404).send();
      }

      res.send(blog);
  }
  catch(e){
      res.status(500).send();
  }
});

// Update blog in database
router.patch('/api/blog/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try{
      const blog = await BlogPost.findOne({_id: _id});

      if(!blog){
          return res.status(404).send();
      }

      updates.forEach((update) => blog[update] = req.body[update]);
      await blog.save();

      res.send(blog);
  }
  catch(e){
      res.status(400).send(e);
  }
});


module.exports = router;
