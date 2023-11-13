const db = require("../db/db");

class Cartcontrollers {
  static async addToCart(req, res) {
    try {
      const currentDate = new Date();
      const dbProducts = await db("product").select("*");

      // Mengambil ID Produk dan Quantity dari Body/Page
      const idProduct = parseInt(req.body.idProduct);
      const idUser = parseInt(req.params.id);
      const quantityUser = parseInt(req.body.quantityUser);

      // mengambil data produk berdasarkan IDnya dari DB Produk untuk di sync di DB cart
      const product = dbProducts.find((item) => item.product_id === idProduct);
      console.log(product);

      // Conditional untuk memastikan bahwa produk tersebut ada
      if (!product) {
        return res.status(404).json({ error: "Produk tidak dapat ditemukan." });
      }

      // Conditional untuk memastikan bahwa stock barang mencukupi dari pesanan user
      if (quantityUser > product.stock) {
        return res.status(400).json({
          error: "Barang Gak Ready ! Quantity melebihi stock yang available.",
        });
      }

      // menampung data cart untuk di push
      const cartItem = {
        quantity: quantityUser,
        user_id: idUser,
        product_id: idProduct,
        created_at: currentDate,
        updated_at: currentDate,
      };

      await db("cart")
        .insert(cartItem)
        .then(function (result) {
          res.json({ success: true, message: `cart added` });
        });
    } catch (error) {
      console.error("Error menambahkan data ke dalam cart:", error);
      res.status(500).json({ error: "Failed to Add Cart" });
    }
  }

  static async getAllCartData(req, res) {
    console.log("Controller Connected");
    const dataCart = await db("cart").select("*");
    res.status(200).json(dataCart);
  }

  static async deleteById(req, res) {
    try {
      const productId = req.body.productId;
      const userId = req.params.id;

      await db("cart")
        .where({ product_id: productId, user_id: userId })
        .del()
        .then(() => {
          res.status(200).json({ message: `Product telah dihapus dari Cart` });
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Gagal menghapus produk dari cart.",
          error: error.message,
        });
    }
  }
}

module.exports = Cartcontrollers;
