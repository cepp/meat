import {MenuItem} from '../menu-item/menu-item.model';
import {CartItem} from './cart-item.model';

export class ShoppingCartService {
  items: CartItem[] = [];

  clear() {
    this.items = [];  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.menuItem.id);
    if (foundItem && foundItem.quantity > 1) {
      this.decreaseQty(foundItem);
    } else {
      this.items.splice(this.items.indexOf(item), 1);
    }  }

  total(): number {
    return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0);  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    if (item && item.quantity > 1) {
      item.quantity = item.quantity - 1;
    } else {
      this.items.splice(this.items.indexOf(item), 1);
    }
  }
}
