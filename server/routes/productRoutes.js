const routes = require("express").Router();
const Productcontrollers = require("../controllers/productController");

routes.get("/", Productcontrollers.getAllDataProduct);

module.exports = routes;
