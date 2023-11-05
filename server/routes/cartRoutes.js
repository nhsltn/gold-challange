const routes = require("express").Router();
const Cartcontrollers = require("../controllers/cartController");

routes.post("/:id", Cartcontrollers.addToCart);

routes.get("/view", Cartcontrollers.getAllCartData);

routes.delete("/del/:id", Cartcontrollers.deleteById);

module.exports = routes;
