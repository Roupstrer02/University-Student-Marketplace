import { browser } from "$app/environment";
import { writable, derived } from "svelte/store";

export const cartItems = writable([]);

if (browser) {
  if (localStorage.cartItems) {
    cartItems.set(JSON.parse(localStorage.cartItems));
  }

  cartItems.subscribe((items) => {
    localStorage.cartItems = JSON.stringify(items);
  });
}

export const cart = {
  subscribe: cartItems.subscribe,
  addToCart: (ad) => {
    cartItems.update((items) => {
      const existingItem = items.find((item) => item.title === ad.title);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        const cartItem = {
          title: ad.title,
          price: ad.price,
          image: ad.image,
          quantity: 1,
          totalPrice: ad.price,
          id: ad.id
        };
        items.push(cartItem);
      }

      return items;
    });
  },
  removeFromCart: (title) => {
    cartItems.update((items) => {
      const itemIndex = items.findIndex((item) => item.title === title);

      if (itemIndex !== -1) {
        if (items[itemIndex].quantity > 1) {
          items[itemIndex].quantity--;
          items[itemIndex].totalPrice =
            items[itemIndex].quantity * items[itemIndex].price;
        } else {
          items.splice(itemIndex, 1);
        }
      }

      return items;
    });
  },
};

export const cartTotal = derived(cartItems, ($cartItems) =>
  $cartItems.reduce((total, item) => total + item.totalPrice, 0)
);