/**
 * Formats the time duration between startTime and endTime into hours/min/sec format.
 */
const formatTime = (startTime: number, endTime: number): string => {
  const totalSeconds = Math.floor((endTime - startTime) / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }
  if (minutes > 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return `0:${formattedSeconds}`;
};

export { formatTime };
