export const problemOptions = Array(20).fill().map((_, index) => {
  return { value: index + 1, label: "" + (index + 1) };
});

export const digitOptions = Array(10).fill().map((_, index) => {
  return { value: index, label: "" + (index) };
});