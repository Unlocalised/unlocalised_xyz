const express = require('express');
const Skill = require('../models/skill');
const auth  = require('../middleware/auth');

const router = express.Router();

// Get all skills
router.get('/api/experience', async (req, res) =>{

  try{
    const skills = await Skill.find();

    if(skills.length === 0){
      return res.status(404).send();
    }

    res.send(skills);
  }
  catch(error){
    res.status(500).send();
  }

});

// Get specific blog post
router.get('/api/experience/:skillName', async (req, res) =>{

  const match = {};

  if(req.query.skillName){
    match.skillName = req.query.skillName === 'true';
  }

  try{

    const skill = await Skill.findOne({skillName: req.query.skillName});

    if(!skill){
      return res.status(404).send({error: 'No skill with that name here'});
    }

    res.send(skill);
  }
  catch(error){
    res.status(500).send();
  }

});

// Add skill to database
router.post('/api/experience', auth,  async (req, res) =>{
  const skill = new Skill({
    ...req.body,
  });

  try{
      await skill.save();
      res.status(201).send(skill);
  }
  catch(e){
      res.status(400).send(e);
  }
});

// Remove a skill from the database
router.delete('/api/experience/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  try{

      const skill = await Skill.findOneAndDelete({
          _id, // equal to _id: _id
      });

      if(!skill){
          return res.status(404).send();
      }

      res.send(skill);
  }
  catch(e){
      res.status(500).send();
  }
});

// Edit a skill
router.patch('/api/experience/:id', auth, async (req, res) =>{
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try{
      const skill = await Skill.findOne({_id: _id});

      if(!skill){
          return res.status(404).send();
      }

      updates.forEach((update) => skill[update] = req.body[update]);
      await skill.save();

      res.send(skill);
  }
  catch(e){
      res.status(400).send(e);
  }
});

module.exports = router;
