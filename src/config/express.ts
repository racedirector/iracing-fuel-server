import express from 'express';
import { createGraphQLSchema } from './graphql';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/graphql', createGraphQLSchema());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  return app;
};

export { createServer };
