const express = require('express');
const Project = require('../models/project');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all projects
router.get('/api/projects', async (req, res) =>{

  try{
    const projects = await Project.find();

    if(projects.length === 0){
      return res.status(404).send();
    }

    res.send(projects);
  }
  catch(error){
    res.status(500).send();
  }

});

// Get specific blog post
router.get('/api/projects/:id', async (req, res) =>{

  const _id = req.params.id;

  try{
    const projects = await Project.find();

    if(projects.length === 0){
      return res.status(404).send();
    }

    if(!projects[_id]){
      return res.status(404).send({error: 'No project here'});
    }

    res.send(projects[_id]);
  }
  catch(error){
    res.status(500).send();
  }

});


// Add project to database
router.post('/api/projects', auth,  async (req, res) =>{
  const project = new Project({
    ...req.body,

  });

  try{
      await project.save();
      res.status(201).send(project);
  }
  catch(e){
      res.status(400).send(e);
  }
});

// Remove a project from the database
router.delete('/api/projects/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  try{

      const project = await Project.findOneAndDelete({
          _id, // equal to _id: _id
      });

      if(!project){
          return res.status(404).send();
      }

      res.send(project);
  }
  catch(e){
      res.status(500).send();
  }
});

router.patch('/api/projects/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try{
      const project = await Project.findOne({_id: _id});

      if(!project){
          return res.status(404).send();
      }

      updates.forEach((update) => project[update] = req.body[update]);
      await project.save();

      res.send(project);
  }
  catch(e){
      res.status(400).send(e);
  }
});

module.exports = router;
