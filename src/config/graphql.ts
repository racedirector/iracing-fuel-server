import { RequestHandler } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema';
import resolvers from '../graphql/resolvers';

export const createGraphQLSchema = (): RequestHandler =>
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  });
