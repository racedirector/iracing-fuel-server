import { averageFuelUsageResolver, fuelUsageResolver, carsResolver, tracksForCarResolver } from './fuelData';

const root = {
  fuelUsage: fuelUsageResolver,
  averageFuelUsage: averageFuelUsageResolver,
  cars: carsResolver,
  tracksForCar: tracksForCarResolver,
};

export default root;
