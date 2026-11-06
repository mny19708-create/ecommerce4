// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// --- Client Views ---
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import WishlistView from '../views/WishlistView.vue'
import AuthView from '../views/AuthView.vue'
import Account from '@/views/Account.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'
import CheckoutView from '../views/CheckoutView.vue'



// --- Info Views ---
import OurStoryView from '../views/OurStoryView.vue'
import CommunityProducersView from '../views/CommunityProducersView.vue'
import FaqsView from '../views/FaqsView.vue'
import ShippingReturnsView from '../views/ShippingReturnsView.vue'
import ContactUsView from '../views/ContactUsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// --- Admin Layout & Views ---
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'
import ManageProducts from '@/views/admin/ManageProducts.vue'
import ManageCategories from '@/views/admin/ManageCategories.vue'
import ManageOrders from '@/views/admin/ManageOrders.vue'
import OrderDetail from '@/views/admin/OrderDetail.vue'
import ManageCustomers from '@/views/admin/ManageCustomers.vue'
import CustomerProfile from '@/views/admin/CustomerProfile.vue'
import ManageReviews from '@/views/admin/ManageReviews.vue'
import ManagePromotions from '@/views/admin/ManagePromotions.vue'
import ManageCMS from '@/views/admin/ManageCMS.vue'
import ManageSettings from '@/views/admin/ManageSettings.vue'
import AdminLogin from '@/views/admin/LoginView.vue'
import TwoFactorView from '@/views/admin/TwoFactorView.vue'
import ForgotPasswordView from '@/views/admin/ForgotPasswordView.vue'

const routes = [
  // --- Home & Main Products ---
  { path: '/', name: 'home', component: HomeView },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/products/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/product-detail-view/:id', name: 'product-detail-view', component: ProductDetailView },

  // --- Category Pages ---
 
  { path: '/category/:slug', name: 'category-products', component: ProductsView },

  // --- Specific Product Detail Pages ---
 
  {
    path: '/product/:id(\\d+)',
    name: 'ProductByIdRedirect',
    redirect: (to) => ({ name: 'SouvenirGiftSetDetail', params: { id: to.params.id } })
  },

  // --- User / Shopping Cart / Account ---
  { path: '/auth', name: 'auth', component: AuthView },
  { path: '/account', name: 'account', component: Account },
  { path: '/orders', name: 'order-history', component: OrderHistoryView, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },

  // --- Info Pages ---
  { path: '/our-story', name: 'our-story', component: OurStoryView },
  { path: '/community-producers', name: 'community-producers', component: CommunityProducersView },
  { path: '/faqs', name: 'faqs', component: FaqsView },
  { path: '/shipping-returns', name: 'shipping-returns', component: ShippingReturnsView },
  { path: '/contact-us', name: 'contact-us', component: ContactUsView },

  // --- Admin Auth Routes (public, គ្មាន sidebar) ---
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  { path: '/admin/2fa', name: 'admin-2fa', component: TwoFactorView },
  { path: '/admin/forgot-password', name: 'admin-forgot-password', component: ForgotPasswordView },

  // --- Admin Routes (ក្នុង AdminLayout មាន sidebar) ---
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboard },
      { path: 'products', name: 'admin-products', component: ManageProducts },
      { path: 'categories', name: 'admin-categories', component: ManageCategories },
      { path: 'orders', name: 'admin-orders', component: ManageOrders },
      { path: 'orders/:id', name: 'admin-order-detail', component: OrderDetail },
      { path: 'customers', name: 'admin-customers', component: ManageCustomers },
      { path: 'customers/:id', name: 'admin-customer-profile', component: CustomerProfile },
      { path: 'reviews', name: 'admin-reviews', component: ManageReviews },
      { path: 'promotions', name: 'admin-promotions', component: ManagePromotions },
      { path: 'cms', name: 'admin-cms', component: ManageCMS },
      { path: 'settings', name: 'admin-settings', component: ManageSettings }
    ]
  },

  // --- Catch-all 404 ---
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// --- Admin Auth Guard ---
const ADMIN_PUBLIC_ROUTES = ['admin-login', 'admin-2fa', 'admin-forgot-password']

router.beforeEach((to) => {
  if (!to.path.startsWith('/admin')) return

  const auth = useAuthStore()
  const isPublic = ADMIN_PUBLIC_ROUTES.includes(to.name)
  const isAdmin = !!auth.token && auth.userRole === 'admin'

  // មិនមែន admin → ទៅ login
  if (!isPublic && !isAdmin) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }

  // admin login រួចហើយ → មិនបាច់ឃើញទំព័រ login ទៀត
  if (to.name === 'admin-login' && isAdmin) {
    return { name: 'admin-dashboard' }
  }
})

export default router