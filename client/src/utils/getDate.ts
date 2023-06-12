export const getDate = (index: number) => {
  const date = new Date();
  return date.getTime() * index * Math.random();
};
