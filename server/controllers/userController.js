const dbUser = require("../db/user.json");
const fs = require("fs");

class Usercontrollers {
  // Fungsi untuk mem-generate user ID
  static generateNewUserid(user) {
    if (user.length === 0) {
      // bila belum ada data user di database ID pertama akan dibuat dengan value 1
      return 1;
    } else {
      // bila sudah ada data, maka kita akan mengambil ID terakhir dan menambah valuenya dengan +1
      const maxUserId = Math.max(...user.map((item) => item.userId));
      return maxUserId + 1;
    }
  }

  static userRegister(req, res) {
    try {
      const userDb = [...dbUser];
      const userId = Usercontrollers.generateNewUserid(userDb); // mengenerate userID
      const { username, password, email, full_name, address, phone } = req.body; // mengambil data dari Body (Page/Postman)

      const userData = {
        // mengumpulkan data ke variabel
        userId,
        username,
        password,
        email,
        full_name,
        address,
        phone,
      };

      // push user data ke DB
      res.send(userData);
      dbUser.push(userData);
      let stringify = JSON.stringify(dbUser);
      fs.writeFileSync("./db/user.json", stringify);
    } catch (error) {
      console.error("Error dalam mendaftarkan user", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  static userLogin(req, res) {
    try {
      const userDb = [...dbUser];
      // mengambil data username & password dari postman/page
      const { username, password } = req.body;

      // Autentikasi untuk login
      // 1. Find Username
      const findUname = userDb.find((item) => item.username === username);
      if (!findUname) {
        return res.status(401).json({ message: "User Not Found" });
      }

      // 2. Check Password
      const pwdMatch = userDb.find((item) => item.password === password);
      if (!pwdMatch) {
        return res.status(401).json({ message: "Wrong Password" });
      }

      res.json({ message: "Login Success" });
    } catch (error) {
      console.error("Error dalam proses login", error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
}

module.exports = Usercontrollers;
