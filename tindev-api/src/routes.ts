import express from 'express';

import DevController from './conrollers/DevController';
import DislikeLikeControler from './conrollers/DislikeController';
import LikeControler from './conrollers/LikeController';

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeControler.store);
routes.post('/devs/:devId/dislikes', DislikeLikeControler.store);

export default routes;
