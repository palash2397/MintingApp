export const removeZero = value => {
  const result = Math.round(parseFloat(value) * Math.pow(10, 10)) / Math.pow(10, 10);

  return result;
};

export const getEligibilityNftPreSale = (tokenCount, lastBuy = 0) => {
  if (tokenCount >= 1500 && tokenCount < 3000) return 2 - lastBuy;
  if (tokenCount >= 3000 && tokenCount < 4500) return 4 - lastBuy;
  if (tokenCount >= 4500 && tokenCount < 6000) return 6 - lastBuy;
  if (tokenCount >= 6000 && tokenCount < 7500) return 8 - lastBuy;
  if (tokenCount >= 7500) return 10 - lastBuy;
};
