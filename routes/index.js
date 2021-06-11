const express = require("express");
const routes = express.Router();
 
const subscribers = require('./subscribers');
const blog = require('./blog'); 
const account = require('./account');
 
routes.use('/subscribers', subscribers); 
routes.use('/blogs', blog);  
routes.use('/accounts', account); 

module.exports = routes;