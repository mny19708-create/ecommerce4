// src/stores/product.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService } from '@/services/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const currentProduct = ref(null)
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Search និង Filter states
  const searchQuery = ref('')
  const selectedCategory = ref(null)

  // ១. ទាញយកបញ្ជីផលិតផលទាំងអស់
  const fetchProducts = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await productService.getAllProducts(params)
      // គាំទ្រទាំងទម្រង់ Array ផ្ទាល់ ឬទម្រង់ { data: [...] }
      products.value = Array.isArray(response) ? response : (response.data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = 'មិនអាចទាញយកទិន្នន័យផលិតផលបានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. ទាញយកព័ត៌មានលម្អិតផលិតផលតាម ID
  const fetchProductById = async (id) => {
    loading.value = true
    error.value = null
    try {
      // ព្យាយាមរកក្នុង Local State មុនដើម្បីความលឿន
      let found = products.value.find(p => p.id == id || p.product_id == id)
      if (!found) {
        const response = await productService.getProductById(id)
        found = response.data || response
      }
      currentProduct.value = found
      return found
    } catch (err) {
      console.error('Error fetching product details:', err)
      error.value = 'មិនអាចទាញយកព័ត៌មានលម្អិតផលិតផលបានទេ!'
      return null
    } finally {
      loading.value = false
    }
  }

  // ៣. ទាញយកប្រភេទផលិតផល (Categories)
  const fetchCategories = async () => {
    try {
      // បើមាន category service អាចហៅទីនេះ បាន បច្ចុប្បន្នទាញយក Category ពី products ស្រាប់
      const uniqueCategories = [...new Set(products.value.map(p => p.category).filter(Boolean))]
      categories.value = uniqueCategories
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  // ៤. Computed សម្រាប់ Filter ផលិតផលតាម Search Query និង Category
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const name = product.name || product.product_name || ''
      const matchesName = name.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesCategory = selectedCategory.value 
        ? product.category === selectedCategory.value || product.category_id === selectedCategory.value 
        : true

      return matchesName && matchesCategory
    })
  })

  // Load ទិន្នន័យដំបូងស្វ័យប្រវត្តិពេលហៅ Store
  fetchProducts()

  return {
    products,
    currentProduct,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    filteredProducts,
    fetchProducts,
    fetchProductById,
    fetchCategories
  }
})