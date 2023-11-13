const routes = require("express").Router();
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const userRoutes = require("./userRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const checkoutRoutes = require("./checkoutRoutes");
const paymentRoutes = require("./paymentRoutes");

routes.get("/", (req, res) => res.render("home"));

routes.get("/about-us", (req, res) => res.render("aboutus"));

routes.use("/api/user", userRoutes);

routes.use("/api/products", productRoutes);

routes.use("/api/cart", cartRoutes);

routes.use("/api/wishlist", wishlistRoutes);

routes.use("/api/checkout", checkoutRoutes);

routes.use("/api/payment", paymentRoutes);

module.exports = routes;
