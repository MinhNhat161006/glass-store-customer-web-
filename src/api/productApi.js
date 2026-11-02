import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const productApi = {
  // Lấy danh sách sản phẩm (hỗ trợ lọc theo categoryId, productType, status)
  getAllProducts: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/products', { params });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products from API Gateway:', error);
      throw error;
    }
  },

  // Lấy chi tiết sản phẩm theo ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Lấy chi tiết sản phẩm theo Slug
  getProductBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/api/products/slug/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product by slug ${slug}:`, error);
      throw error;
    }
  },
};

export default apiClient;

