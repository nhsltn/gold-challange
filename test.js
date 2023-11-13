const dbProducts = require("./server/db/products.json");
console.log(dbProducts);
const cartItem = [
  {
    cartId: 1,
    idProduct: 2,
    quantityUser: 1,
  },
];
console.log(cartItem);
const mergedArray = cartItem
  .map((cartItem) => {
    const product = dbProducts.find(
      (product) => product.id === cartItem.idProduct
    );
    if (product) {
      return {
        cartId: cartItem.cartId,
        IDProduk: cartItem.idProduct,
        brand: product.brand,
      };
    }
    return null;
  })
  .filter((item) => item !== null);

console.log("Array yang digabungkan:");
console.log(mergedArray);
