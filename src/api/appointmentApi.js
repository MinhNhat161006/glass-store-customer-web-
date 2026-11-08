const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '';

export const appointmentApi = {
  async createAppointment(appointment) {
    const token = localStorage.getItem('optivision_customer_token');
    if (!token) {
      throw new Error('Vui lòng đăng nhập tài khoản khách hàng trước khi đặt lịch.');
    }

    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(appointment)
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.message || `Không thể lưu lịch hẹn (${response.status}).`);
    }
    const savedAppointment = result?.data ?? result;
    if (!savedAppointment?.id || !savedAppointment?.ticketCode) {
      throw new Error('Chưa nhận được mã lịch hẹn đã lưu. Vui lòng thử lại.');
    }
    return savedAppointment;
  }
};
