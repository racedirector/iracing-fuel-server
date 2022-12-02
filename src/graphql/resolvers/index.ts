import {
  averageFuelUsageResolver,
  fuelUsageResolver,
  carsResolver,
  tracksForCarResolver,
  isAverageUsageReliableResolver,
} from './fuelData';

const root = {
  fuelUsage: fuelUsageResolver,
  averageFuelUsage: averageFuelUsageResolver,
  cars: carsResolver,
  tracksForCar: tracksForCarResolver,
  isAverageUsageReliable: isAverageUsageReliableResolver,
};

export default root;
