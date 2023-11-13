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
        .then(function () {
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

      res.redirect("/");
    } catch (error) {
      console.error("Error dalam proses login", error);
      res.status(500).json({ error: "Failed to login" });
    }
  }

  static async renderLoginPage(req, res) {
    res.render("login");
  }

  static async updateUserProfile(req, res) {
    try {
      const idUser = parseInt(req.params.id);
      const { nama, email, address, phone_number } = req.body;

      const updatedUserData = {
        nama,
        email,
        address,
        phone_number,
        updated_at: new Date(),
      };

      const result = await db("user")
        .where("user_id", idUser)
        .update(updatedUserData)
        .then(function () {
          res.json({ success: true, message: `update profile berhasil` });
        });

      if (result === 0) {
        // Jika tidak ada pengguna dengan user_id tersebut
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to update user profile" });
    }
  }
}

module.exports = Usercontrollers;
