const tokenGenerator = () =>
  (
    Math.random().toString(32).substring(2) +
    Math.random().toString(32).substring(2) +
    Math.random().toString(32).substring(2) +
    Math.random().toString(32).substring(2)
  ).toUpperCase();

export default tokenGenerator;
