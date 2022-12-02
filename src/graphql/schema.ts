import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
export default buildSchema(`
  input FuelUsageInputType {
    carName: String!
    track: String!
  }

  type Query {
    isAverageUsageReliable(input: FuelUsageInputType!): Boolean!
    cars: [String!]!
    tracksForCar(carName: String!): [String!]!
    fuelUsage(input: FuelUsageInputType!): [Float!]!
    averageFuelUsage(input: FuelUsageInputType!): Float!
    lastFuelUsage(input: FuelUsageInputType!): Float!
  }
`);
