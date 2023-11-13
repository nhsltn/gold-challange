const db = require("../db/db");

class Paymentcontrolers {
  static async processPayment(req, res) {
    try {
      console.log("controller connected");
      const currentDate = new Date();
      const idUser = parseInt(req.params.id);
      const { checkout_id, payment_method } = req.body;

      const order = await db("checkout")
        .select("total_price")
        .where({ user_id: idUser, checkout_id })
        .first();

      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }

      const amount = order.total_price;

      const reference =
        Paymentcontrolers.generatePaymentReference(payment_method);

      if (!reference) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid payment method" });
      }

      const paymentData = {
        payment_method: payment_method,
        paymet_reference: reference,
        user_id: idUser,
        checkout_id: checkout_id,
        amount: amount,
        status: "Paid",
        created_at: currentDate,
        updated_at: currentDate,
      };

      await db("payment")
        .insert(paymentData)
        .then(function () {
          res.json({ success: true, message: "payment berhasil" });
        });

      const resi = Paymentcontrolers.generateTrackingNumber();

      await db("checkout")
        .where({
          checkout_id: checkout_id,
        })
        .update({
          shipment_status: "Dikirim",
          payment_status: "Paid",
          tracking_number: resi,
          updated_at: currentDate,
        });
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to process payment" });
    }
  }

  static generatePaymentReference(payment_method) {
    switch (payment_method.toLowerCase()) {
      case "va":
        return (
          "VA" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        );
      case "gopay":
        return (
          "GP" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        );
      default:
        return null;
    }
  }

  static generateTrackingNumber() {
    // Logika untuk menghasilkan nomor pelacakan
    // Misalnya, kombinasi tanggal dan karakter acak
    const date = new Date().toISOString().replace(/[^0-9]/g, "");
    const randomDigits = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");
    return `${date}${randomDigits}`;
  }
}

module.exports = Paymentcontrolers;
