const baseUrl = import.meta.env?.VITE_API_BASE_URL || '';

export const checkoutApi = {
  async createOrder(payload, idempotencyKey) {
    const token = localStorage.getItem('optivision_customer_token');
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(result?.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.');
      error.code = result?.errorCode;
      error.details = result?.data ?? result?.details;
      throw error;
    }
    const order = result?.data ?? result;
    if (!order?.id || !order?.orderCode) throw new Error('Chưa nhận được thông tin đơn hàng đã lưu. Vui lòng thử lại.');
    return order;
  },
};
