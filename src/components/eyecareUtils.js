export const eyeFields = ['odSph', 'odCyl', 'odAxis', 'odAdd', 'osSph', 'osCyl', 'osAxis', 'osAdd', 'pd'];
export const measurement = value => value == null || value === '' ? '—' : String(value);
export const eyeFieldLabel = field => field === 'pd' ? 'Tổng PD (mm)' : ({ notes: 'Ghi chú', lensName: 'Tên tròng', lensSku: 'Mã tròng' }[field] || `${field.startsWith('od') ? 'OD' : 'OS'} ${field.slice(2).toUpperCase()}`);
export const appointmentStatus = { WAITING: 'Đang chờ', IN_EXAM: 'Đang đo', COMPLETED: 'Đã hoàn tất', CANCELLED: 'Đã hủy' };
export const appointmentDate = value => !value ? '—' : value.includes('T') && !Number.isNaN(new Date(value).getTime())
  ? new Date(value).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', dateStyle: 'short', timeStyle: 'short' }) : value;

export function bookingTime(value, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value || '')) throw new Error('Vui lòng chọn ngày và giờ hẹn.');
  const timestamp = `${value}:00+07:00`;
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) throw new Error('Giờ hẹn phải hợp lệ và ở tương lai (giờ Việt Nam).');
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date).replace(' ', 'T');
  if (parts !== value || date <= now) throw new Error('Giờ hẹn phải hợp lệ và ở tương lai (giờ Việt Nam).');
  return timestamp;
}

export function revisionChanges(before, after) {
  return [...eyeFields, 'notes', 'lensName', 'lensSku'].filter(field => {
    const a = before?.[field] ?? null;
    const b = after?.[field] ?? null;
    return eyeFields.includes(field) && a != null && b != null ? Number(a) !== Number(b) : a !== b;
  }).map(field => ({ field, before: before?.[field], after: after?.[field] }));
}
