const dbProducts = require("../db/products.json");
const dbCart = require("../db/cart.json");
const fs = require("fs");

class Cartcontrollers {
  // Fungsi untuk mem-generate user ID
  static generateNewCartId(cart) {
    if (cart.length === 0) {
      return 1;
    } else {
      const maxCartId = Math.max(...cart.map((item) => item.cartId));
      return maxCartId + 1;
    }
  }

  static addToCart(req, res) {
    try {
      const productDb = [...dbProducts];
      const cartDb = [...dbCart];
      // Mengambil ID Produk dan Quantity dari Body/Page
      const idProduct = parseInt(req.body.idProduct);
      const quantityUser = parseInt(req.body.quantityUser);
      // Generate ID Cart
      let cartId = Cartcontrollers.generateNewCartId(cartDb);

      // mengambil data produk berdasarkan IDnya dari DB Produk untuk di sync di DB cart
      const product = productDb.find((item) => item.id === idProduct);

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
        cartId,
        idProduct,
        quantityUser,
        brand: product.brand,
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
      };

      // push ke DB
      dbCart.push(cartItem);
      let stringify = JSON.stringify(dbCart);
      fs.writeFileSync("./db/cart.json", stringify);
    } catch (error) {
      console.error("Error menambahkan data ke dalam cart:", error);
      res.status(500).json({ error: "Failed to Add Cart" });
    }
  }

  static getAllCartData(req, res) {
    res.status(200).json(dbCart);
  }

  static deleteAllData(req, res) {
    try {
      const cartDb = [...dbCart];
      // Built in Function untuk menghapus semua item dalam Cart
      cartDb.splice(0);
      // Push Cart yang dihapus ke database
      dbCart.push(cartDb);
      let stringify = JSON.stringify(dbCart);
      fs.writeFileSync("./db/cart.json", stringify);
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Failed to delete data." });
    }
  }

  static deleteById(req, res) {
    try {
      console.log("controller connected");
      // mengambil ID Cart dari Params/URL
      const idCart = parseInt(req.params.id);
      console.log(idCart, "ambil cart ID dari Params");

      // Mengambil Database Cart
      const cartDb = [...dbCart];

      // mencari index dari DB Cart bedasarkan ID
      const index = cartDb.findIndex((item) => item.cartId === idCart);
      console.log(index, "Check Index");
      if (index === -1) {
        return res
          .status(404)
          .json({ error: "Barang tidak ditemukan didalam Keranjang." });
      }

      // Hapus elemen dengan index yang sesuai menggunakan splice
      cartDb.splice(index, 1);
      dbCart.push(cartDb);
      let stringify = JSON.stringify(dbCart);
      fs.writeFileSync("./db/cart.json", stringify);
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Failed to delete data." });
    }
  }
}

module.exports = Cartcontrollers;
