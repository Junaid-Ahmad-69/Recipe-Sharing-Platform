const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

// 1) Middleware Application
app.use(express.json({limit: "30kb"}));

// 2) Read the static files
app.use(express.static(path.join(__dirname, "public")));

// 3) Read the pug files
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

//4) Use cookies parser to get the cookies data from cookies of browser in every single request
app.use(cookieParser());

const recipeRouter = require('./routes/recipe')
const userRouter = require('./routes/user')
const viewRouter = require('./routes/view')

// 4 Routes
app.use(`/`, viewRouter);
app.use('/api/v1/recipe', recipeRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;