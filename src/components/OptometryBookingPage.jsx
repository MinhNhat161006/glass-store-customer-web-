import React, { useEffect, useMemo, useState } from 'react';
import { 
  Check, Calendar, Clock, MapPin, User, ShieldCheck, 
  FileText, AlertCircle, ChevronRight, Phone, Mail, Award 
} from 'lucide-react';
import { locationApi } from '../api/locationApi';
import { appointmentApi } from '../api/appointmentApi';
import { authApi } from '../api/authApi';

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function OptometryBookingPage({
  setActiveTab,
  initialLocationCode = '',
  currentUser,
  openAuth
}) {
  // Booking Form State
  const [branch, setBranch] = useState(initialLocationCode);
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [locationsError, setLocationsError] = useState('');
  const [service, setService] = useState('BASIC');
  const [specialist, setSpecialist] = useState('BS_QUAN');
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:45 - 10:15');
  const [bookingSaving, setBookingSaving] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  // Customer info
  const [customerName, setCustomerName] = useState(currentUser?.fullName || currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [notifyChannel, setNotifyChannel] = useState('ZALO');
  const [symptoms, setSymptoms] = useState(['BLUR_FAR', 'TIRED_EYES']);
  const [clinicalNotes, setClinicalNotes] = useState('Đang đeo kính cận -2.25 độ được 1.5 năm, dạo gần đây đọc sách hay bị mỏi mắt...');
  const dateOptions = useMemo(() => Array.from({ length: 7 }, (_, offset) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return {
      value: toDateKey(date),
      day: String(date.getDate()),
      sub: offset === 0
        ? 'HÔM NAY'
        : new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date)
    };
  }), []);
  const selectedMonth = new Intl.DateTimeFormat('vi-VN', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${selectedDate}T00:00:00`));
  const formattedSelectedDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(`${selectedDate}T00:00:00`));

  useEffect(() => {
    let active = true;
    locationApi.getActiveLocations()
      .then((result) => {
        if (!active) return;
        setLocations(result);
        setBranch((current) => result.some((location) => location.code === current)
          ? current
          : result[0]?.code || '');
        setLocationsError('');
      })
      .catch((error) => {
        if (active) setLocationsError(error.message || 'Không thể tải địa điểm.');
      })
      .finally(() => {
        if (active) setLocationsLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    setCustomerName(currentUser.fullName || currentUser.name || '');
    setPhone(currentUser.phoneNumber || currentUser.phone || '');
    setEmail(currentUser.email || '');
  }, [currentUser]);

  const toggleSymptom = (sym) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter((s) => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const selectedLocation = locations.find((location) => location.code === branch);
    if (!selectedLocation) {
      setLocationsError('Vui lòng chọn một địa điểm đang hoạt động.');
      return;
    }
    if (!authApi.getToken()) {
      setBookingError('Vui lòng đăng nhập tài khoản khách hàng để lưu lịch hẹn.');
      openAuth?.();
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      setBookingError('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }
    setBookingSaving(true);
    setBookingError('');
    setBookingMessage('');
    try {
      const saved = await appointmentApi.createAppointment({
        ticketType: 'E-Pass Online',
        customerName: customerName.trim(),
        customerPhone: phone.trim(),
        locationCode: selectedLocation.code,
        scheduledDate: selectedDate,
        scheduledTime: selectedTimeSlot
      });
      setBookingMessage(
        `Đã lưu lịch hẹn ${saved.ticketCode} tại ${selectedLocation.name} (${selectedLocation.code}) vào ${selectedDate}, ${selectedTimeSlot}.`
      );
    } catch (error) {
      setBookingError(error.message || 'Không thể lưu lịch hẹn.');
    } finally {
      setBookingSaving(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header */}
      <div>
        <nav className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
          <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
            Trang Chủ
          </span>
          <span>/</span>
          <span className="text-[#074768] font-bold">Đặt Lịch Đo Khúc Xạ Chuẩn Y Khoa</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Đặt Lịch Khám & Đo Thị Lực Chuẩn Nhãn Khoa
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Hệ thống đặt lịch ưu tiên không chờ đợi, miễn phí 100% quy trình đo khúc xạ 12 bước với hệ thống máy kỹ thuật số.
        </p>
      </div>

      {/* 2. Main 2-Columns Layout: 4 Steps (Left) + Booking Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 4-Step Form (Ảnh 4 chuẩn xác) */}
        <div className="lg:col-span-8 space-y-8">
          {/* STEP 1: Chọn Chi Nhánh Khám */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Chọn Địa Điểm Khám
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hệ thống phòng khám khúc xạ tiêu chuẩn cao tại các showroom đô thị.
                </p>
              </div>
            </div>

            {locationsLoading && <div role="status" className="py-6 text-center text-xs text-slate-500">Đang tải địa điểm…</div>}
            {locationsError && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                {locationsError}
              </div>
            )}
            {!locationsLoading && !locations.length && !locationsError && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                Chưa có địa điểm đang hoạt động.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              {locations.map((b) => (
                <div
                  key={b.code}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') setBranch(b.code);
                  }}
                  onClick={() => setBranch(b.code)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    branch === b.code
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{b.name}</span>
                      {branch === b.code && <Check className="w-3.5 h-3.5 text-[#074768]" />}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {[b.area, b.locationType === 'BRANCH' ? 'Chi nhánh' : b.locationType === 'WAREHOUSE' ? 'Kho' : 'Chưa phân loại']
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">{b.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: Chọn Dịch Vụ Khám & Chuyên Viên */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Chọn Dịch Vụ Khám & Chuyên Viên
                </h3>
                <p className="text-[11px] text-slate-500">
                  Chẩn đoán chuyên sâu theo nhu cầu thị giác riêng biệt.
                </p>
              </div>
            </div>

            {/* Service options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => setService('BASIC')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  service === 'BASIC'
                    ? 'border-[#074768] bg-[#f0f9ff] text-[#074768]'
                    : 'border-slate-200 text-slate-700 bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">Đo Cận / Loạn Học Đường & Văn Phòng</span>
                  <span className="text-emerald-600 font-extrabold text-[11px]">0đ (Miễn phí)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Khám khúc xạ tổng quát 12 bước, tư vấn thị lực học tập & làm việc máy tính.
                </p>
              </div>

              <div
                onClick={() => setService('ADVANCED')}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  service === 'ADVANCED'
                    ? 'border-[#074768] bg-[#f0f9ff] text-[#074768]'
                    : 'border-slate-200 text-slate-700 bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">Khám Khúc Xạ Chuyên Sâu & Đa Tròng</span>
                  <span className="text-emerald-600 font-extrabold text-[11px]">0đ (Tài trợ)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tư vấn tròng kiểm soát tiến triển cận thị trẻ em và tròng đa tiêu cự người lớn tuổi.
                </p>
              </div>
            </div>

            {/* Specialists row */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 block mb-2.5">
                Bác Sĩ / Chuyên Viên Khúc Xạ Phụ Trách:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'BS_QUAN', name: 'BS. Vũ Minh Quân', role: 'Trưởng khoa Khúc xạ (15 năm KN)' },
                  { id: 'BS_TRANG', name: 'ThS.BS. Lê Thu Trang', role: 'Chuyên gia Đo tròng (12 năm KN)' },
                  { id: 'AUTO', name: 'Ưu Tiên Giờ Phù Hợp', role: 'Hệ thống tự gán Optometrist sẵn sàng' },
                ].map((sp) => (
                  <div
                    key={sp.id}
                    onClick={() => setSpecialist(sp.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      specialist === sp.id
                        ? 'border-[#074768] bg-white ring-2 ring-[#074768]/20 text-[#074768] font-bold'
                        : 'border-slate-200 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs">{sp.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{sp.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: Chọn Ngày & Khung Giờ Đo (Ảnh 4 chuẩn xác) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Chọn Ngày & Khung Giờ Đo
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Lựa chọn khung giờ không phải chờ đợi tiếp đón chu đáo (30 phút/ca).
                  </p>
                </div>
              </div>

              {/* Status legend */}
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#074768]"></span> Đang chọn
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span> Còn chỗ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-200"></span> Đầy chỗ
                </span>
              </div>
            </div>

            {/* Date selection bar */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Ngày thăm khám ({selectedMonth}):
              </span>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {dateOptions.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setSelectedDate(d.value)}
                    className={`p-2.5 rounded-xl border transition flex flex-col items-center justify-center ${
                      selectedDate === d.value
                        ? 'border-[#074768] bg-[#074768] text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-semibold opacity-80">{d.sub}</span>
                    <span className="text-sm font-black mt-0.5">{d.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots groups: Sáng / Chiều / Tối (Ảnh 4) */}
            <div className="space-y-4 pt-2">
              {/* Ca Sáng */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  ☀️ Ca Sáng (09:00 - 11:30)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { slot: '09:00 - 09:30', status: 'Còn 2 chỗ', disabled: false },
                    { slot: '09:45 - 10:15', status: 'Đang chọn', disabled: false },
                    { slot: '10:30 - 11:00', status: 'Còn 1 chỗ', disabled: false },
                    { slot: '11:00 - 11:30', status: 'Đầy chỗ', disabled: true },
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSelectedTimeSlot(s.slot)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedTimeSlot === s.slot
                          ? 'border-[#074768] bg-[#074768] text-white font-bold shadow-sm'
                          : s.disabled
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.slot}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">{s.status}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ca Chiều */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  🌤️ Ca Chiều (13:30 - 17:00)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { slot: '13:30 - 14:00', status: 'Còn 3 chỗ', disabled: false },
                    { slot: '14:15 - 14:45', status: 'Còn 2 chỗ', disabled: false },
                    { slot: '15:00 - 15:30', status: 'Còn 1 chỗ', disabled: false },
                    { slot: '16:00 - 16:30', status: 'Còn 3 chỗ', disabled: false },
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSelectedTimeSlot(s.slot)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedTimeSlot === s.slot
                          ? 'border-[#074768] bg-[#074768] text-white font-bold shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.slot}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">{s.status}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ca Tối */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  🌙 Ca Tối (18:00 - 20:30)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { slot: '18:00 - 18:30', status: 'Còn 1 chỗ', disabled: false },
                    { slot: '18:45 - 19:15', status: 'Còn 1 chỗ', disabled: false },
                    { slot: '19:30 - 20:00', status: 'Còn 2 chỗ', disabled: false },
                    { slot: '20:00 - 20:30', status: 'Đầy chỗ', disabled: true },
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSelectedTimeSlot(s.slot)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedTimeSlot === s.slot
                          ? 'border-[#074768] bg-[#074768] text-white font-bold shadow-sm'
                          : s.disabled
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.slot}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">{s.status}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Thông Tin Người Khám Thị Lực (Ảnh 4 chuẩn xác) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Thông Tin Người Khám Thị Lực
                </h3>
                <p className="text-[11px] text-slate-500">
                  Dữ liệu hồ sơ bệnh án điện tử và gửi thông báo xác nhận tự động.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Họ & Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 font-medium outline-none focus:border-[#074768] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Số điện thoại (Nhận SMS/Zalo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 font-medium outline-none focus:border-[#074768] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Email nhận kết quả đơn kính
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 font-medium outline-none focus:border-[#074768] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Kênh nhắc lịch tự động
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setNotifyChannel('ZALO')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                      notifyChannel === 'ZALO' ? 'border-[#074768] bg-[#f0f9ff] font-bold text-[#074768]' : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input type="radio" checked={notifyChannel === 'ZALO'} readOnly className="text-[#074768]" />
                    <span>Zalo ZNS Official</span>
                  </label>
                  <label
                    onClick={() => setNotifyChannel('SMS')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                      notifyChannel === 'SMS' ? 'border-[#074768] bg-[#f0f9ff] font-bold text-[#074768]' : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input type="radio" checked={notifyChannel === 'SMS'} readOnly className="text-[#074768]" />
                    <span>SMS Brandname</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Triệu chứng thị giác hiện tại */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Triệu chứng thị giác hiện tại (chọn nhiều mục):
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'BLUR_FAR', label: '✓ Nhìn mờ bảng / xa' },
                  { id: 'TIRED_EYES', label: '✓ Mỏi mắt / làm việc vi tính' },
                  { id: 'NIGHT_GLARE', label: '+ Chói mắt ban đêm' },
                  { id: 'CHANGE_FRAME', label: '+ Cần đổi gọng & tròng mới' },
                  { id: 'ROUTINE', label: '+ Khám định kỳ 6 tháng' },
                ].map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => toggleSymptom(sym.id)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition ${
                      symptoms.includes(sym.id)
                        ? 'bg-[#074768] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {sym.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ghi chú lâm sàng */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ghi chú lâm sàng cho bác sĩ (tùy chọn)
              </label>
              <textarea
                rows={2}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Ví dụ: Đang đeo kính cận -2.25 độ được 1.5 năm, dạo gần đây đọc sách hay bị mỏi mắt..."
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#074768] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right: Booking Summary Card (Ảnh 4 chuẩn xác) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                  PHIẾU ĐẶT HẸN
                </span>
                <h3 className="text-base font-black text-slate-900">Booking Summary</h3>
              </div>
              <span className="bg-[#f0fdf4] text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Tự động giữ chỗ
              </span>
            </div>

            {/* Summary Details */}
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#074768] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Chi nhánh đã chọn:</span>
                  <span className="font-bold text-slate-900">CN Quận 1 (88 Lê Thánh Tôn, Q.1)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#074768] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Gói thăm khám:</span>
                  <span className="font-bold text-slate-900">Đo Cận / Loạn Học Đường & Văn Phòng</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#074768] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Thời gian hẹn:</span>
                  <span className="font-bold text-slate-900">{selectedTimeSlot}, {formattedSelectedDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#074768] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Chuyên viên phụ trách:</span>
                  <span className="font-bold text-slate-900">BS. Vũ Minh Quân</span>
                </div>
              </div>
            </div>

            {/* Price section */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Chi phí thăm khám:</span>
                <span className="line-through">200.000 đ</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-1">
                <span>Tổng thanh toán:</span>
                <span className="text-xl text-[#074768]">0đ (Miễn phí)</span>
              </div>
            </div>

            {/* Confirm CTA */}
            {bookingError && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                {bookingError}
              </div>
            )}
            {bookingMessage && (
              <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                {bookingMessage}
              </div>
            )}
            <button
              onClick={handleConfirmBooking}
              disabled={bookingSaving || locationsLoading || !locations.length}
              className="w-full bg-[#074768] hover:bg-[#09577f] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#074768]/25 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>{bookingSaving ? 'Đang lưu lịch hẹn…' : 'Xác Nhận Đặt Lịch Hẹn Ngay'}</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Mã xác nhận OTP và nhắc hẹn sẽ gửi qua tin nhắn SMS/Zalo trước 1 giờ.
            </p>
          </div>

          {/* Clinical Pre-Appointment Notes Box (Ảnh 4) */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold">
              <AlertCircle className="w-4 h-4 text-[#0284c7]" />
              <span>Lưu Ý Trước Khi Đến Khám</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-500 pl-4 list-disc leading-relaxed">
              <li>Mang theo kính cũ hoặc vỏ hộp kính hiện tại (nếu có).</li>
              <li>Ngưng đeo kính áp tròng mềm trước 24 giờ (kính cứng trước 72h).</li>
              <li>Nên ngủ đủ giấc, tránh sử dụng bia rượu liên tục 12 giờ trước khi đo.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Existing Customer Appointment Card (Ảnh 4 chân trang) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7]">
              LỊCH SỬ THĂM KHÁM
            </span>
            <h3 className="text-base font-black text-slate-900 mt-0.5">
              Lịch Hẹn Của Bạn Trong Hệ Thống
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('records')}
            className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1"
          >
            <span>Xem toàn bộ hồ sơ thị lực</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Appointment Card */}
        <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#074768] text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs text-slate-900">
                  Lịch hẹn kiểm tra thị lực định kỳ
                </h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Đã hoàn thành
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                14:00 - Thứ Tư, 15/03/2026 • CN Quận 1 (TP.HCM) • Khám bởi ThS.BS. Lê Thu Trang
              </p>
              <p className="text-[11px] font-mono font-semibold text-[#074768] mt-0.5">
                Mã số: OPT-2026-1042 | Kết quả: Cận -2.25 | Loạn -0.50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => alert('Đang tải phiếu kết quả khám nhãn khoa PDF...')}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
            >
              📄 Đơn kính
            </button>
            <button
              onClick={() => alert('Đã mở giao diện đặt lịch tái khám mới!')}
              className="px-4 py-1.5 rounded-xl bg-[#074768] hover:bg-[#09577f] text-white font-bold text-xs transition"
            >
              Đặt lịch tái khám
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
