// khai bao danh sach do choi ban dau

const Toys = require("../models/Toys");

// viet cac ham xu ly tren danh sach do choi
const data = [
  new Toys("Lego", "Trẻ 6+", ["xây dựng", "tư duy"]),
  new Toys("Barbie", "Trẻ 4+", ["búp bê", "tưởng tượng"]),
  new Toys("Gấu bông", "Trẻ 2+", ["mềm mại", "ngủ ngon"]),
  new Toys("Rô bốt", "Trẻ 10+", ["mô hình", "trang trí"]),
];

// 1. ShowToys
const showToys = () => {
  data.forEach((item) => console.log(item.toString()));
};

// 2. Search Toy
const findToys = (keyword) => {
  const research = data.filter(
    ({ name, tags }) =>
      name.toLowerCase().includes(keyword.toLowerCase()) ||
      tags.some((item) => item.toLowerCase().includes(keyword.toLowerCase()))
  );
  if (research.length == 0) console.log("Not found");
  else research.forEach((item) => console.log(item.toString()));
};

// 3. Add new toy
const addNewToys = (newToy) => {
  data.push(newToy);
};

// 4. Update toy

// 5. Delete toy

module.exports = { showToys, findToys, addNewToys };
