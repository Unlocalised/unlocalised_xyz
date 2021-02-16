const express = require('express');

require('./db/mongoose');


const blogPostRouter = require('./routers/blogpost');
const projectRouter = require('./routers/project');
const experienceRouter = require('./routers/experience');
const contactRouter = require('./routers/contact');
const adminRouter = require('./routers/admin');

const app = express();

app.use(express.json());
app.use(blogPostRouter);
app.use(projectRouter);
app.use(experienceRouter);
app.use(contactRouter);
app.use(adminRouter);

module.exports = app;
