const db = require("../db/db");

class Productcontrollers {
  static async getAllDataProduct(req, res) {
    console.log("Controller Connected");
    const dataProducts = await db("product").select("*");
    res.status(200).json(dataProducts);
  }
}

module.exports = Productcontrollers;
