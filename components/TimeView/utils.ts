export const formatSeconds = (seconds: number) => {
  const date = new Date(seconds * 1000).toISOString();
  if (seconds > 3600) return date.substring(11, 19);
  return date.substring(14, 19);
};
