import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
export default buildSchema(`
  input FuelUsageInputType {
    carName: String!
    track: String!
  }

  type Query {
    fuelUsage(input: FuelUsageInputType!): [Float!]!
    averageFuelUsage(input: FuelUsageInputType!): Float!
    cars: [String!]!
    tracksForCar(carName: String!): [String!]!
  }
`);
