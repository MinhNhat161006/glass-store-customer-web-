const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const authApi = {
  /**
   * Đăng nhập khách hàng bằng email và mật khẩu (Không dùng OTP)
   * @param {Object} credentials { email, password }
   */
  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại');
    }
    if (data.data?.token) {
      localStorage.setItem('optivision_customer_token', data.data.token);
      localStorage.setItem('optivision_customer_user', JSON.stringify(data.data));
    }
    return data.data;
  },

  /**
   * Đăng ký tài khoản khách hàng mới (ACTIVE ngay, Không OTP)
   * @param {Object} customerData { fullName, email, password, phoneNumber }
   */
  async register(customerData) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Đăng ký thất bại');
    }
    return data.data;
  },

  /**
   * Lấy thông tin tài khoản hiện tại từ JWT
   */
  async getMe() {
    const token = localStorage.getItem('optivision_customer_token');
    if (!token) return null;

    const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      this.logout();
      return null;
    }
    const data = await res.json();
    return data.data;
  },

  /**
   * Đăng xuất khỏi hệ thống
   */
  logout() {
    localStorage.removeItem('optivision_customer_token');
    localStorage.removeItem('optivision_customer_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('optivision_customer_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  getToken() {
    return localStorage.getItem('optivision_customer_token');
  }
};
