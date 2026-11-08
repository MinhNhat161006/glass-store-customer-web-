const baseUrl = import.meta.env?.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const token = localStorage.getItem('optivision_customer_token');
  if (!token) throw new Error('Vui lòng đăng nhập để xem hồ sơ và đặt lịch.');
  const response = await fetch(`${baseUrl}${path}`, {
    ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message || 'Không thể tải dữ liệu chăm sóc mắt. Vui lòng thử lại.');
    error.status = response.status;
    error.code = result?.errorCode;
    throw error;
  }
  return result?.data;
}
const list = data => {
  if (!Array.isArray(data)) throw new Error('Dữ liệu chăm sóc mắt không hợp lệ.');
  return data;
};
export const eyecareApi = {
  async getPrescriptions(customerId) {
    if (!Number.isInteger(Number(customerId)) || Number(customerId) <= 0) throw new Error('Thiếu thông tin khách hàng.');
    return list(await request(`/api/prescriptions/customer/${customerId}`));
  },
  async getRevisions(id) { return list(await request(`/api/prescriptions/${id}/revisions`)); },
  async getAppointments() { return list(await request('/api/appointments')); },
  async createAppointment(payload) {
    const data = await request('/api/appointments', { method: 'POST', body: JSON.stringify(payload) });
    if (!data?.id || !data.ticketCode || data.status !== 'WAITING') throw new Error('Chưa nhận được lịch hẹn đã lưu. Hãy tải lại danh sách trước khi thử đặt lại.');
    return data;
  },
};
