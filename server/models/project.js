const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  backgroundMotivationText: {
    type: String,
    required: true
  },
  blogPostLink: {
    type: String,
    required: true
  },
  carouselImagePaths:[{
    type: String,
    required: true
  }],
  challengesText: {
    type: String,
    required:true
  },
  demoSiteLink: {
    type: String,
    required: true
  },
  lessonsText:{
    type: String,
    required: true
  },
  projectMoods: [{
    moodDescription:{
      type: String,
      required: true
    },
    moodValue: {
      type: String,
      required:true
    }
  }],
  projectQuote: {
    type: String,
    required: true
  },
  projectSummaryImagePath: {
    type: String,
    required: true
  },
  quoteCitation: {
    type: String,
    required: true
  },
  responsibilitiesText: {
    type: String,
    required: true
  },
  sourceCodeLink: {
    type: String,
    required: true
  },
  summaryDetail: {
    type: String,
    required: true
  },
  summaryTitle: {
    type: String,
    required: true
  },
  technologiesUsed:[{
    type: String,
    required: true
  }],
  testimonials:[{
    type: String,
    required: true
  }],
  toolsUsed:[{
    type: String,
    required: true
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
