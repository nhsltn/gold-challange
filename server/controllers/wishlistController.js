const dbProducts = require("../db/products.json");
const dbWl = require("../db/wishlist.json");
const fs = require("fs");

class Wishlistcontrollers {
  static generateNewWlId(wl) {
    if (wl.length === 0) {
      return 1;
    } else {
      const maxWlId = Math.max(...wl.map((item) => item.wlId));
      return maxWlId + 1;
    }
  }

  static addToWl(req, res) {
    try {
      const productDb = [...dbProducts];
      const wlDb = [...dbWl];

      // Mengambil ID Produk dari Body/Page
      const idProduct = parseInt(req.body.idProduct);

      // Generate ID WishList
      let wlId = Wishlistcontrollers.generateNewWlId(wlDb);

      // mengambil data produk berdasarkan IDnya dari DB Produk untuk di sync di DB WishList
      const product = productDb.find((item) => item.id === idProduct);

      // Conditional untuk memastikan bahwa produk tersebut ada
      if (!product) {
        return res.status(404).json({ error: "Produk tidak dapat ditemukan." });
      }

      const wlItem = {
        wlId,
        idProduct,
        brand: product.brand,
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
      };

      dbWl.push(wlItem);
      res.status(201).json({ succeess: "berhasil menambahkan ke Wishlist" });
      let stringify = JSON.stringify(dbWl);
      fs.writeFileSync("./db/wishlist.json", stringify);
    } catch (error) {
      console.error("Error menambahkan data ke dalam Wish List:", error);
      res.status(500).json({ error: "Failed to Wish List" });
    }
  }

  static getAllWlData(req, res) {
    console.log("Controller Connected");
    res.status(200).json(dbWl);
  }
}

module.exports = Wishlistcontrollers;
