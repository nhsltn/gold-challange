Buatlah Feature untuk Handle Ecommerce

1. Melihat daftar product (get) // Success
2. Menambahkan product kedalam keranjang belanja
   a. Body = id dan jumlah product yang dimasukan kedalam keranjang
   b. id = id product yang tersedia
   c. kuantitas tidak boleh melebihi stock barang
   d. Response ialah saldo yang dimiliki user
3. Melihat isi keranjang Belanja
   a. tidak perlu ada req.body
   b. response berisi barang yang ada di table keranjang
