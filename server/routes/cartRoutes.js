const routes = require("express").Router();
const Cartcontrollers = require("../controllers/cartController");

routes.post("/", Cartcontrollers.addToCart);

routes.get("/view", Cartcontrollers.getAllCartData);

routes.delete("/", Cartcontrollers.deleteAllData);

routes.delete("/:id", Cartcontrollers.deleteById);

module.exports = routes;
