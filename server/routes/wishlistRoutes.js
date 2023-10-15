const routes = require("express").Router();
const Wishlistcontrollers = require("../controllers/wishlistController");

routes.post("/", Wishlistcontrollers.addToWl);

routes.get("/view", Wishlistcontrollers.getAllWlData);

module.exports = routes;
