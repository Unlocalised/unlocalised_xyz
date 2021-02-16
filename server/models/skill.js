const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  isWorkHistory: {
    type: Boolean,
    required: true
  },
  skillAchievements: [{
    info: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }],
  skillDetails: [{
    info: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }],
  skillImagePath:{
    type: String,
    required: true
  },
  skillLevel: [{
    type: String,
    required: true
  }],
  skillName: {
    type: String,
    required: true
  },
  skillNumber: {
    type: String,
    required: true
  }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
