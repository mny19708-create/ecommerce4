// src/composables/useCart.js
// កន្ត្រក និង wishlist រក្សាក្នុង localStorage សម្រាប់ដំណាក់កាល frontend
// ពេលមាន backend ជំនួសដោយ cartService (តារាង cart_items) និង wishlistService (តារាង wishlists)
import { ref, computed } from 'vue';
import wishlistService from '@/services/wishlistService';

const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

// state រួមទាំងកម្មវិធី (module-level) ដូច្នេះ navbar និង Home ឃើញតម្លៃដូចគ្នា
const items = ref(read('cart'));
const wishIds = ref(read('wishlist'));

export function useCart() {
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));

  const add = (product, quantity = 1) => {
    const found = items.value.find((i) => i.id === product.id);
    if (found) {
      found.quantity += quantity;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.salePrice ?? product.price,
        image: product.image,
        quantity,
      });
    }
    write('cart', items.value);
  };

  const remove = (id) => {
    items.value = items.value.filter((i) => i.id !== id);
    write('cart', items.value);
  };

  const setQuantity = (id, quantity) => {
    const found = items.value.find((i) => i.id === id);
    if (!found) return;
    if (quantity <= 0) return remove(id);
    found.quantity = quantity;
    write('cart', items.value);
  };

  const clear = () => {
    items.value = [];
    write('cart', items.value);
  };

  return { items, count, total, add, remove, setQuantity, clear };
}

export function useWishlist() {
  const count = computed(() => wishIds.value.length);
  const has = (id) => wishIds.value.includes(id);
  const toggle = (id) => {
    const adding = !has(id);
    wishIds.value = adding ? [...wishIds.value, id] : wishIds.value.filter((x) => x !== id);
    write('wishlist', wishIds.value);
    // បើ Login រួច ធ្វើសមកាលកម្មទៅ backend (មិនរង់ចាំលទ្ធផល)
    if (localStorage.getItem('token')) {
      (adding ? wishlistService.add(id) : wishlistService.remove(id)).catch(() => {});
    }
  };
  return { ids: wishIds, count, has, toggle };
}