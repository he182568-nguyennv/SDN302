const readLine = require("readline");
const { showToys, findToys, addNewToys } = require("./services/toyService");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  console.log(`
             ======MENU======
        1. Hiển thị danh sách đồ chơi
        2. Tìm kiếm đồ chơi
        3. Thêm đồ chơi mới 
        4. Cập nhật đồ chơi theo mã
        5. Xóa đồ chơi theo mã
        0. Thoát`);
};

const promptUser = () => {
  showMenu();
  rl.question("Hãy chọn chức năng: ", (option) => {
    switch (option) {
      case "0":
        console.log("See you again");
        rl.close();
        return;
      case "1":
        console.log("Danh sách đồ chơi hiện có: ");
        showToys();
        promptUser();
        break;
      case "2":
        console.log("Tìm kiếm đồ chơi");
        rl.question("Nhập: ", (keyword) => {
          findToys(keyword);
          promptUser();
        });
        break;
      case "3":
        console.log("Thêm đồ chơi đồ chơi");
        rl.question("Nhập: ", (newToy) => {
          addNewToys(newToy);
          promptUser();
        });
        break;
      case "4":
        console.log("Cập nhật đồ chơi");
        promptUser();
        break;
      case "5":
        console.log("Xóa đồ chơi đồ chơi");
        promptUser();
        break;
    }
  });
  // Cho người dùng chọn chức năng thông qua bàn phím
};

console.log("      Chương trình quản lý đồ chơi trẻ em");
promptUser();
