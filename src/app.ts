import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import './interfaces/http/controllers/TreeController'
import './interfaces/http/controllers/AuthController'
import './interfaces/http/controllers/StringController'
import { container } from '../inversify.config';
import { Database } from './config/Database';
import dotenv from 'dotenv';
dotenv.config();


const server = new InversifyExpressServer(container);
const dbService = container.get(Database);

dbService.connect();

server.setConfig((app) => {

  app.use(express.json());

  app.use(require('cors')());

});

const app = server.build();
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});