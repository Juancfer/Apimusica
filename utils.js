const generateRandom = (min = 0, max = 100) => {
  const difference = max - min + 1;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
};

module.exports = {
  generateRandom
}
