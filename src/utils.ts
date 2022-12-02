import { ConfigIniParser } from 'config-ini-parser';
import fs from 'fs';
import os from 'os';

// Convert the value from the .ini file to a usable array of numbers.
// The first value in the array represents the number of "valid" fuel
// usage laps we have. The following 5 values represent fuel usage.
export const normalizeFuelDataString = (dataString: string): number[] =>
  dataString
    .split(',')
    .filter((entry) => entry.trim() != '')
    .map((number) => parseFloat(number));

export const normalizeFuelData = (dataString: string): [number, number[]] => {
  const [numberOfLaps, ...fuelData] = normalizeFuelDataString(dataString);
  return [numberOfLaps, fuelData.slice(0, numberOfLaps)];
};

const IRacingFuelDataFilePath = `${os.homedir()}/Documents/iRacing/fueldata.ini`;

export const createFuelParser = async (): Promise<ConfigIniParser> => {
  const fuelDataFileContent = await fs.promises.readFile(IRacingFuelDataFilePath, 'utf-8');
  const parser = new ConfigIniParser();
  parser.parse(fuelDataFileContent);
  return parser;
};

export const parseFuelDataString = (parser: ConfigIniParser, carName: string, track: string): string | undefined => {
  if (parser.isHaveSection(carName)) {
    if (parser.isHaveOption(carName, track)) {
      return parser.get(carName, track);
    }
  }

  return undefined;
};

export const parseFuelData = (parser: ConfigIniParser) => (carName: string, track: string) => {
  const fuelDataString = parseFuelDataString(parser, carName, track);
  return fuelDataString ? normalizeFuelData(fuelDataString) : [];
};
