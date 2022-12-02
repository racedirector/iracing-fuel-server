import {
  averageFuelUsageResolver,
  fuelUsageResolver,
  carsResolver,
  tracksForCarResolver,
  isAverageUsageReliableResolver,
  lastFuelUsageResolver,
} from './fuelData';

const root = {
  fuelUsage: fuelUsageResolver,
  averageFuelUsage: averageFuelUsageResolver,
  lastFuelUsage: lastFuelUsageResolver,
  cars: carsResolver,
  tracksForCar: tracksForCarResolver,
  isAverageUsageReliable: isAverageUsageReliableResolver,
};

export default root;
