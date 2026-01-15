const ToyUtil = {
  generateId: (() => {
    let currentId = 1;
    return () => currentId++;
  })(),
};
module.exports = ToyUtil;
