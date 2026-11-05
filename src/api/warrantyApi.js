const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '';
const authHeaders = () => { const token=localStorage.getItem('optivision_customer_token'); return token ? {Authorization: `Bearer ${token}`} : {}; };

export const warrantyApi = {
  /**
   * Lấy toàn bộ danh sách phiếu bảo hành
   */
  async getAllWarranties() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/warranties`, { headers: authHeaders() });
      if (!res.ok) throw new Error('Không thể kết nối API bảo hành');
      return await res.json();
    } catch (err) {
      console.warn('Lỗi khi gọi API getAllWarranties:', err);
      return [];
    }
  },

  /**
   * Tra cứu bảo hành theo mã thẻ (VD: WAR-OPTI-9842)
   */
  async getWarrantyByCode(code) {
    try {
      const cleanCode = encodeURIComponent(code.trim().replace(/^#/, ''));
      const res = await fetch(`${API_BASE_URL}/api/warranties/code/${cleanCode}`, {headers: authHeaders()});
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Không tìm thấy mã bảo hành');
      return await res.json();
    } catch (err) {
      console.warn('Lỗi khi gọi API getWarrantyByCode:', err);
      return null;
    }
  },

  /**
   * Tra cứu đa năng: theo SĐT, Mã thẻ hoặc Mã đơn hàng
   */
  async searchWarranties(query) {
    try {
      if (!query || !query.trim()) return [];
      const cleanQuery = query.trim().replace(/^#/, '');
      const res = await fetch(`${API_BASE_URL}/api/warranties/search?q=${encodeURIComponent(cleanQuery)}`, {headers: authHeaders()});
      if (res.ok) {
        return await res.json();
      }
      
      // Fallback nếu endpoint /search không khả dụng
      const all = await this.getAllWarranties();
      const q = cleanQuery.toLowerCase();
      return all.filter(w =>
        (w.warrantyCode && w.warrantyCode.toLowerCase().includes(q)) ||
        (w.customerPhone && w.customerPhone.includes(q)) ||
        (w.originalOrderCode && w.originalOrderCode.toLowerCase().includes(q)) ||
        (w.customerName && w.customerName.toLowerCase().includes(q))
      );
    } catch (err) {
      console.warn('Lỗi khi tìm kiếm bảo hành:', err);
      return [];
    }
  },

  /**
   * Gửi yêu cầu bảo hành / đổi trả mới
   */
  async createClaim(warrantyData) {
    const res = await fetch(`${API_BASE_URL}/api/warranties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(warrantyData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Lỗi khi gửi yêu cầu bảo hành');
    }
    return await res.json();
  }
};

