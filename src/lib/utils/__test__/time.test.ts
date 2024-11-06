import { formatTime } from '../time';

describe('formatTime', () => {
  it('should format time correctly with hours', () => {
    const startTime = Date.now();
    const endTime = startTime + 3661000; // 1 hour, 1 minute, and 1 second
    expect(formatTime(startTime, endTime)).toBe('1:01:01');
  });

  it('should format time correctly with minutes', () => {
    const startTime = Date.now();
    const endTime = startTime + 125000; // 2 minutes and 5 seconds
    expect(formatTime(startTime, endTime)).toBe('02:05');
  });

  it('should format time correctly with seconds', () => {
    const startTime = Date.now();
    const endTime = startTime + 17000; // 17 seconds
    expect(formatTime(startTime, endTime)).toBe('0:17');
  });

  it('should format time correctly with no time elapsed', () => {
    const startTime = Date.now();
    const endTime = startTime; // No time elapsed
    expect(formatTime(startTime, endTime)).toBe('0:00');
  });
});
