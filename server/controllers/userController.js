const db = require("../db/db");

class Usercontrollers {
  static async userRegister(req, res) {
    try {
      const currentDate = new Date();
      const { username, password, email, nama, address, phone_number } =
        req.body; // mengambil data dari Body (Page/Postman)

      const userData = {
        // mengumpulkan data ke variabel
        username,
        password,
        email,
        nama,
        address,
        phone_number,
        created_at: currentDate,
        updated_at: currentDate,
      };

      await db("user")
        .insert(userData)
        .then(function (result) {
          res.json({ success: true, message: `user registered` });
        });
    } catch (error) {
      console.error("Error dalam mendaftarkan user", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  static async userLogin(req, res) {
    try {
      // Ambil data dari DB
      const dataUser = await db("user").select("*");

      // mengambil data username & password dari postman/page
      const { username, password } = req.body;

      // Autentikasi untuk login
      // 1. Find Username
      const findUname = dataUser.find((item) => item.username === username);
      if (!findUname) {
        return res.status(401).json({ message: "User Not Found" });
      }

      // 2. Check Password
      const pwdMatch = dataUser.find((item) => item.password === password);
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
