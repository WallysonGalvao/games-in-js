export function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${secs}`;
}
