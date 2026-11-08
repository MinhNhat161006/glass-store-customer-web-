const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const locationApi = {
  async getActiveLocations() {
    const response = await fetch(`${API_BASE_URL}/api/locations`);
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(payload?.message || `Không thể tải địa điểm (${response.status}).`);
    }
    if (!Array.isArray(payload?.data)) {
      throw new Error('Dữ liệu địa điểm không hợp lệ.');
    }
    return payload.data;
  }
};
