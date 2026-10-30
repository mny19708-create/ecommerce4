// src/services/normalizers.js
// បម្លែងទិន្នន័យពី Laravel (ឈ្មោះ column ក្នុង database) ទៅជាឈ្មោះដែល Vue ប្រើ
// បើ backend ប្តូរឈ្មោះ field ក្រោយ កែតែឯកសារនេះ មិនបាច់កែ component ទេ

export const toUser = (raw = {}) => ({
  id: raw.user_id ?? raw.id,
  name: raw.full_name ?? raw.name,
  email: raw.email,
  phone: raw.phone ?? null,
  role: raw.role ?? 'customer',
});

export const toProduct = (raw = {}) => {
  const price = Number(raw.price); // Laravel ផ្ញើ DECIMAL ជា string ("850.00")
  const discountPercent = Number(raw.discount_percent ?? 0);
  return {
    id: raw.product_id ?? raw.id,
    name: raw.product_name ?? raw.name,
    description: raw.description ?? '',
    price,
    discountPercent,
    salePrice: discountPercent ? Math.round(price * (100 - discountPercent)) / 100 : price,
    stock: raw.stock_quantity ?? 0,
    image: raw.image_url ?? null,
    categoryId: raw.category_id ?? null,
    sellerId: raw.seller_id ?? null,
    rating: raw.average_rating != null ? Number(raw.average_rating) : null,
    sold: raw.sold_count ?? 0,
  };
};

const slugify = (s = '') =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const toCategory = (raw = {}) => ({
  id: raw.category_id ?? raw.id,
  name: raw.category_name ?? raw.name,
  description: raw.description ?? '',
  slug: raw.slug ?? (slugify(raw.category_name ?? raw.name) || String(raw.category_id ?? raw.id)),
});

export const toReview = (raw = {}) => ({
  id: raw.review_id ?? raw.id,
  rating: Number(raw.rating ?? 0),
  comment: raw.comment ?? '',
  author: raw.customer?.full_name ?? raw.author ?? 'អតិថិជន',
  product: raw.product?.product_name ?? null,
  date: raw.created_at ?? null,
});

export const toDiscount = (raw = {}) => ({
  id: raw.discount_id ?? raw.id,
  name: raw.discount_name ?? raw.name,
  type: raw.discount_type ?? 'percentage', // 'percentage' | 'fixed'
  value: Number(raw.discount_value ?? 0),
  endDate: raw.end_date ?? null,
});

// តារាង addresses
export const toAddress = (raw = {}) => ({
  id: raw.address_id ?? raw.id,
  recipient: raw.recipient_name ?? raw.recipient ?? '',
  phone: raw.phone ?? '',
  province: raw.province_city ?? raw.province ?? '',
  district: raw.khan_district ?? raw.district ?? '',
  commune: raw.sangkat_commune ?? raw.commune ?? '',
  detail: raw.detailed_address ?? raw.detail ?? '',
  isDefault: Boolean(raw.is_default ?? raw.isDefault),
});

// បម្លែងត្រឡប់ទៅឈ្មោះ column ពេលផ្ញើទៅ Laravel
export const fromAddress = (a = {}) => ({
  recipient_name: a.recipient,
  phone: a.phone,
  province_city: a.province,
  khan_district: a.district,
  sangkat_commune: a.commune,
  detailed_address: a.detail,
  is_default: !!a.isDefault,
});

// តារាង orders + order_items + payments
export const toOrder = (raw = {}) => ({
  id: raw.order_id ?? raw.id,
  total: Number(raw.total_amount ?? 0),
  status: raw.order_status ?? 'pending',
  address: raw.shipping_address ?? '',
  date: raw.created_at ?? null,
  items: (raw.items ?? raw.order_items ?? []).map((i) => ({
    id: i.order_item_id ?? i.id,
    productId: i.product_id,
    name: i.product?.product_name ?? i.product_name ?? i.name ?? 'ផលិតផល',
    quantity: i.quantity,
    unitPrice: Number(i.unit_price ?? i.price ?? 0),
  })),
  payment: {
    method: raw.payment?.payment_method ?? raw.payment_method ?? 'COD',
    status: raw.payment?.payment_status ?? raw.payment_status ?? 'pending',
  },
});

// Laravel Resource collection ត្រឡប់ { data: [...] } ហើយ paginate ត្រឡប់ក្នុង data ដែរ
export const unwrapList = (res) => {
  const body = res.data;
  return Array.isArray(body) ? body : body?.data ?? [];
};