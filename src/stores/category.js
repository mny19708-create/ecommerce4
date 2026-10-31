// src/stores/category.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const MOCK_KEY = 'mock_categories'

// ប្រភេទលំនាំដើម 4 ដែល site មានស្រាប់ (slug ត្រូវនឹង route ដែលមាន)
const DEFAULT_MOCK = [
  { id: 1, name_km: 'ក្រមា និងសិប្បកម្ម', name_en: 'Crafts & Krama', slug: 'crafts-krama', is_active: true, sort_order: 1 },
  { id: 2, name_km: 'អាហារ និងគ្រឿងទេស', name_en: 'Food & Spices', slug: 'food-spices', is_active: true, sort_order: 2 },
  { id: 3, name_km: 'សុខភាព និងសម្រស់', name_en: 'Health & Beauty', slug: 'health-beauty', is_active: true, sort_order: 3 },
  { id: 4, name_km: 'កញ្ចប់កាដូ', name_en: 'Souvenir Gift Sets', slug: 'souvenir-gift-sets', is_active: true, sort_order: 4 }
]

const loadMock = () => {
  try {
    const raw = localStorage.getItem(MOCK_KEY)
    return raw ? JSON.parse(raw) : DEFAULT_MOCK
  } catch {
    return DEFAULT_MOCK
  }
}
const saveMock = (list) => localStorage.setItem(MOCK_KEY, JSON.stringify(list))

// បង្កើត slug ពីឈ្មោះអង់គ្លេស: "Handmade Soap" → "handmade-soap"
export const makeSlug = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const unwrapList = (p) => (Array.isArray(p) ? p : p?.data ?? [])

export const useCategoryStore = defineStore('category', () => {
  const categories = ref(USE_MOCK ? loadMock() : [])
  const loading = ref(false)
  const error = ref(null)

  // សម្រាប់ Navbar: បង្ហាញតែប្រភេទដែលបើក ហើយតម្រៀបតាម sort_order
  const activeCategories = computed(() =>
    categories.value
      .filter((c) => c.is_active !== false && c.is_active !== 0)
      .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
  )

  const getBySlug = (slug) => categories.value.find((c) => c.slug === slug) || null

  // ១. ទាញយកបញ្ជី
  const fetchCategories = async () => {
    try {
      loading.value = true
      error.value = null

      if (USE_MOCK) {
        categories.value = loadMock()
        return
      }
      const response = await api.get('/categories')
      categories.value = unwrapList(response.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
      error.value = 'មិនអាចទាញយកប្រភេទផលិតផលបានទេ!'
    } finally {
      loading.value = false
    }
  }

  // ២. បន្ថែម (Admin)
  const createCategory = async (data) => {
    try {
      error.value = null
      const payload = {
        name_km: data.name_km?.trim(),
        name_en: data.name_en?.trim(),
        slug: data.slug?.trim() || makeSlug(data.name_en),
        is_active: data.is_active ?? true
      }
      if (!payload.name_km || !payload.name_en) {
        error.value = 'សូមបញ្ចូលឈ្មោះប្រភេទទាំងខ្មែរ និងអង់គ្លេស'
        return false
      }

      if (USE_MOCK) {
        if (categories.value.some((c) => c.slug === payload.slug)) {
          error.value = 'Slug នេះមានរួចហើយ'
          return false
        }
        const nextOrder = Math.max(0, ...categories.value.map((c) => c.sort_order || 0)) + 1
        categories.value = [
          ...categories.value,
          { id: Date.now(), sort_order: nextOrder, ...payload }
        ]
        saveMock(categories.value)
        return true
      }

      await api.post('/admin/categories', payload)
      await fetchCategories()
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'មិនអាចបន្ថែមប្រភេទបានទេ!'
      return false
    }
  }

  // ៣. កែប្រែ (Admin)
  const updateCategory = async (id, data) => {
    try {
      error.value = null
      if (USE_MOCK) {
        categories.value = categories.value.map((c) =>
          String(c.id) === String(id) ? { ...c, ...data } : c
        )
        saveMock(categories.value)
        return true
      }
      await api.put(`/admin/categories/${id}`, data)
      await fetchCategories()
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'មិនអាចកែប្រែប្រភេទបានទេ!'
      return false
    }
  }

  // ៤. លុប (Admin)
  const deleteCategory = async (id) => {
    try {
      error.value = null
      if (!USE_MOCK) await api.delete(`/admin/categories/${id}`)
      categories.value = categories.value.filter((c) => String(c.id) !== String(id))
      if (USE_MOCK) saveMock(categories.value)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'មិនអាចលុបប្រភេទបានទេ!'
      return false
    }
  }

  // Mock: ធ្វើឱ្យ tab ផ្សេងៗ (admin vs ហាង) sync គ្នា
  if (USE_MOCK && typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === MOCK_KEY) categories.value = loadMock()
    })
  }

  return {
    categories,
    activeCategories,
    loading,
    error,
    getBySlug,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
})