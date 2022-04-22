export default class Item {
  constructor(name, price, quantity = 1) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  increaseQuantity() {
    this.quantity++;
  }
}
