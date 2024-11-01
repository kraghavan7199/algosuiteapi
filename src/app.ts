import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import './interfaces/http/controllers/TreeController'
import './interfaces/http/controllers/AuthController'
import './interfaces/http/controllers/StringController'
import { container } from '../inversify.config';
import { Database } from './config/Database';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit'
dotenv.config();


const server = new InversifyExpressServer(container);
const dbService = container.get(Database);

dbService.connect();

server.setConfig((app) => {

  app.use(express.json());

  app.use(require('cors')());

  app.use(createRateLimiter())

});

const app = server.build();
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


function createRateLimiter() {
  return rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 10000,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later',
  });
}