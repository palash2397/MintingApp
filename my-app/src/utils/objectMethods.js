export const emptyObject = obj => {
  for (const key in obj) {
    try {
      obj[key] = "";
    } catch (error) {
      continue;
    }
  }

  return obj;
};
