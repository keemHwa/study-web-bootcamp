export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
  // toISOString : YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ)
};
