import { backendData } from "./mock.data";

export const transformedData = backendData.map((dataPoint) => ({
  x: new Date(dataPoint.t * 1000), // Convert timestamp to JavaScript Date object
  y: [dataPoint.o, dataPoint.h, dataPoint.l, dataPoint.c],
}));
