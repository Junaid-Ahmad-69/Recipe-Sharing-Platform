const express = require('express');
const path = require('path');
const app = express();

// 1) Middleware Application
app.use(express.json({limit: "10kb"}));

// 2) Read the static files
app.use(express.static(path.join(__dirname, "public")));

// 3) Read the pug files
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

const recipeRouter = require('./routes/recipe')
const userRouter = require('./routes/user')
const viewRouter = require('./routes/view')

// 4 Routes
app.use(`/`, viewRouter);
app.use('/api/v1/recipe', recipeRouter);
app.use('/api/v1/user', userRouter);


module.exports = app;