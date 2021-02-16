const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required:true
  }],
  sections: [{
    type: String,
    required: true
  }],
  mainBlogImagePath:{
    type: String,
    required: true
  },
  postImages: [{
    type: String,
    required: true
  }],
  imagesPerParagraph: {
    type: Number,
    required: true
  },
  bottomImage: {
    type: String,
    required: true
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

