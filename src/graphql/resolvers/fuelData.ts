import { createFuelParser, parseFuelData } from '../../utils';

export const carsResolver = async (): Promise<string[]> => {
  const parser = await createFuelParser();
  return parser.sections();
};

export const tracksForCarResolver = async ({ carName }): Promise<string[]> => {
  const parser = await createFuelParser();
  if (parser.isHaveSection(carName)) {
    return parser.options(carName);
  }

  return [];
};

export const isAverageUsageReliableResolver = async ({ input: { track, carName } }): Promise<boolean> => {
  const [numberOfLaps] = parseFuelData(await createFuelParser())(carName, track);
  return numberOfLaps === 5;
};

export const fuelUsageResolver = async ({ input: { track, carName } }): Promise<number[]> => {
  const [, usage] = parseFuelData(await createFuelParser())(carName, track);
  return usage;
};

export const averageFuelUsageResolver = async ({ input: { track, carName } }): Promise<number | undefined> => {
  const [, usage] = parseFuelData(await createFuelParser())(carName, track);
  if (usage.length > 0) {
    const averageUsage = usage.reduce((averageUsage, usage) => averageUsage + usage, 0) / usage.length;
    return parseFloat(averageUsage.toFixed(2));
  }

  return undefined;
};

export const lastFuelUsageResolver = async ({ input: { track, carName } }): Promise<number | undefined> => {
  const [, usage] = parseFuelData(await createFuelParser())(carName, track);
  return usage.pop();
};
