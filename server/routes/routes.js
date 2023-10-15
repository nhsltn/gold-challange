const routes = require("express").Router();
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRoutes = require("./userRoutes");
const wishlistRoutes = require("./wishlistRoutes");

routes.get("/", (req, res) => res.render("helloWorld"));

routes.use("/api/user", userRoutes);

routes.use("/api/products", productRoutes);

routes.use("/api/cart", cartRoutes);

routes.use("/api/wishlist", wishlistRoutes);

module.exports = routes;
