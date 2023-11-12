const routes = require("express").Router();
const Checkoutcontroller = require("../controllers/checkoutController");

routes.post("/:id", Checkoutcontroller.checkoutFromCart);

module.exports = routes;
