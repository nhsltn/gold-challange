const db = require("../db/db");

class Checkoutcontroller {
  static async checkoutFromCart(req, res) {
    try {
      console.log("controller connected");
      const currentDate = new Date();
      const idUser = parseInt(req.params.id);
      const idCart = parseInt(req.body.idCart);
      const shipment = req.body.shipment;

      const cartItems = await db("cart")
        .select("product_id", "quantity")
        .where({ user_id: idUser, cart_id: idCart });

      const productTotal = await Checkoutcontroller.calculateTotalPrice(
        cartItems
      );

      const shipment_price = Checkoutcontroller.getShipmentPrice(shipment);

      const total_price = productTotal + shipment_price;

      const checkout = {
        total_price,
        user_id: idUser,
        cart_id: idCart,
        created_at: currentDate,
        updated_at: currentDate,
        shipment_method: shipment,
      };

      await db("checkout")
        .insert(checkout)
        .then(function (result) {
          res.json({ success: true, message: `checkout bersahil` });
        });
    } catch (error) {
      console.error("Error saat membuat checkout:", error);
      res.status(500).json({ error: "Failed to create checkout" });
    }
  }

  static async calculateTotalPrice(cartItems) {
    const prices = await Promise.all(
      cartItems.map(async (item) => {
        const product = await db("product")
          .select("price")
          .where("product_id", item.product_id)
          .first();

        return product.price * item.quantity;
      })
    );

    return prices.reduce((total, price) => total + price, 0);
  }

  static getShipmentPrice(shipment_method) {
    const standardPrice = 10000;
    const expressPrice = 20000;

    switch (shipment_method) {
      case "standard":
        return standardPrice;
      case "express":
        return expressPrice;
      default:
        return 0; // Default untuk metode pengiriman tidak valid atau tidak disertakan
    }
  }
}

module.exports = Checkoutcontroller;
