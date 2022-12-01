import { ConfigIniParser } from 'config-ini-parser';
import fs from 'fs';
import os from 'os';

const IRacingFuelDataFilePath = `${os.homedir()}/Documents/iRacing/fueldata.ini`;

const createParser = async (): Promise<ConfigIniParser> => {
  const fuelDataFileContent = await fs.promises.readFile(IRacingFuelDataFilePath, 'utf-8');
  const parser = new ConfigIniParser();
  parser.parse(fuelDataFileContent);
  return parser;
};

export const carsResolver = async (): Promise<string[]> => {
  const parser = await createParser();
  return parser.sections();
};

export const tracksForCarResolver = async (args): Promise<string[]> => {
  const { carName } = args;
  const parser = await createParser();
  if (parser.isHaveSection(carName)) {
    return parser.options(carName);
  }

  return [];
};

// Convert the value from the .ini file to a usable array of numbers.
// The first value in the array represents the number of "valid" fuel
// usage laps we have. The following 5 values represent fuel usage.
const parseFuelDataString = (dataString: string): number[] =>
  dataString
    .split(',')
    .filter((entry) => entry.trim() != '')
    .map((number) => parseFloat(number));

const getFuelData = (dataString: string) => {
  const [numberOfLaps, ...fuelData] = parseFuelDataString(dataString);
  return fuelData.slice(0, numberOfLaps);
};

const parseFuelData = (parser: ConfigIniParser) => (carName: string, track: string) => {
  if (parser.isHaveSection(carName)) {
    if (parser.isHaveOption(carName, track)) {
      const fuelDataString = parser.get(carName, track) as string;
      return getFuelData(fuelDataString);
    }
  }

  return [];
};

export const fuelUsageResolver = async ({ input: { track, carName } }): Promise<number[]> => {
  return parseFuelData(await createParser())(carName, track);
};

export const averageFuelUsageResolver = async ({ input: { track, carName } }) => {
  const fuelData = parseFuelData(await createParser())(carName, track);
  if (fuelData.length > 0) {
    const averageUsage = fuelData.reduce((averageUsage, usage) => averageUsage + usage, 0) / fuelData.length;
    return averageUsage.toFixed(2);
  }

  return undefined;
};
