const dbProducts = require("../db/products.json");

class Productcontrollers {
  static getAllDataProduct(req, res) {
    console.log("Controller Connected");
    res.status(200).json(dbProducts);
  }
}

module.exports = Productcontrollers;
