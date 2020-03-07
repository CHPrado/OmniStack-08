// import express from 'express';
const express = require('express');

const DevController = require('./conrollers/DevController');
const DislikeLikeControler = require('./conrollers/DislikeController');
const LikeControler = require('./conrollers/LikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeControler.store);
routes.post('/devs/:devId/dislikes', DislikeLikeControler.store);

module.exports = routes;
