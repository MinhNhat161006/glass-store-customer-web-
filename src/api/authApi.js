const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const authApi = {
  /**
   * Đăng nhập khách hàng
   * @param {Object} credentials { username, password }
   */
  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
    return data.data;
  },

  /**
   * Đăng ký tài khoản khách hàng mới
   */
  async register(customerData) {
    const res = await fetch(`${API_BASE_URL}/api/users/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại');
    return data.data;
  }
};
