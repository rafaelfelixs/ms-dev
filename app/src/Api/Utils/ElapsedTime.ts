export const elapsedTime = (startTime: [number, number]) => {
  const stop = process.hrtime(startTime);
  return Number(((stop[0] * 1e6 + stop[1]) / 1e6).toFixed(4));
};
