export const getAvailablePredictors = (available, selected) => {
  if (available.length > 0) {
    return available.filter(v => !selected.map(p => p.id).includes(v.id));
  }
  return [];
};
