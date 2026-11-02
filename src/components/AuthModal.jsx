import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { Eye, ShieldCheck, CheckCircle2, Lock, ArrowRight, X, Phone, Mail } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  
  // Form state
  const [phoneNumber, setPhoneNumber] = useState('912345678');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpDigits, setOtpDigits] = useState(['5', '8', '2', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [otpSent, setOtpSent] = useState(true);

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setCountdown(45);
    alert(`Đã gửi mã xác thực OTP 6 chữ số đến số điện thoại (+84) ${phoneNumber}! Mã demo: 582914`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginMethod === 'otp') {
      const otpCode = otpDigits.join('');
      if (otpCode.length < 6) {
        alert('Vui lòng nhập đủ 6 chữ số mã xác thực OTP!');
        return;
      }
    }
    
    let userProfile = {
      name: fullName || 'Nguyễn Hoàng Duy',
      phone: phoneNumber.startsWith('0') ? phoneNumber : ('0' + phoneNumber),
      email: email || 'duy.nguyen@example.com',
      tier: 'VIP 3 Silver',
      points: 450,
    };

    try {
      if (authMode === 'register') {
        const res = await authApi.register({
          fullName: fullName || 'Khách Hàng Mới',
          phoneNumber: userProfile.phone,
          email: userProfile.email,
          membershipTier: 'Thành Viên'
        });
        if (res) userProfile.name = res.fullName;
      } else {
        const res = await authApi.login({
          username: 'cus_duy',
          password: 'Password2026@'
        });
        if (res) {
          userProfile.name = res.fullName;
          userProfile.phone = res.phoneNumber;
          userProfile.email = res.email;
        }
      }
    } catch (err) {
      console.warn('Live API sync notice:', err.message);
    }
    
    if (onLoginSuccess) onLoginSuccess(userProfile);
    alert(`Đăng nhập thành công! Chào mừng ${userProfile.name} đến với OptiVision.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Column: Clinical & Brand Showcase (Ảnh 1 chuẩn xác) */}
          <div className="lg:col-span-5 bg-[#063c59] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background decorative circles / optical reticle */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-sky-400/20 pointer-events-none" />
            <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full border border-sky-400/10 pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Pill tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0d547a] text-sky-200 border border-sky-400/30">
                <Eye className="w-3.5 h-3.5 text-sky-300" />
                <span>OPTIVISION RETAIL & EYECARE</span>
              </div>

              {/* Title & subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                  Hệ Thống Mắt Kính <br />
                  <span className="text-[#38bdf8]">Đa Kênh</span>
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Giải pháp chăm sóc thị giác chuẩn nhãn khoa kết hợp trải nghiệm mua sắm kính mắt thời trang cá nhân hóa cao cấp.
                </p>
              </div>

              {/* Electronic Prescription Card (OD / OS Table) */}
              <div className="bg-[#08486b] rounded-2xl p-4 border border-sky-400/25 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-sky-400/20 text-xs font-bold text-sky-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Hồ Sơ Thị Lực Điện Tử (OD / OS)
                  </span>
                  <span className="text-[10px] text-slate-300">Live Sync</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium text-slate-300 mb-1">
                  <div>MẮT</div>
                  <div>SPH (CẦU)</div>
                  <div>CYL (TRỤ)</div>
                  <div>AXIS / PD</div>
                </div>

                {/* OD row */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs py-1.5 bg-[#05324c]/60 rounded-lg font-mono font-bold mb-1.5 items-center">
                  <div className="text-sky-300 font-sans text-[11px]">OD (Phải)</div>
                  <div className="text-white">-2.25</div>
                  <div className="text-white">-0.75</div>
                  <div className="text-sky-200">175°</div>
                </div>

                {/* OS row */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs py-1.5 bg-[#05324c]/60 rounded-lg font-mono font-bold items-center">
                  <div className="text-sky-300 font-sans text-[11px]">OS (Trái)</div>
                  <div className="text-white">-2.00</div>
                  <div className="text-white">-0.50</div>
                  <div className="text-sky-200">63.5 mm</div>
                </div>
              </div>

              {/* Lab & Warranty Showcase Photo Box */}
              <div className="relative rounded-2xl overflow-hidden border border-sky-400/20 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1582142839970-2b9da988941f?auto=format&fit=crop&w=600&q=80"
                  alt="Phòng Lab Mài Kính OptiVision"
                  className="w-full h-28 object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063c59] via-transparent to-transparent flex items-end justify-between p-3 text-[11px] font-semibold text-slate-200">
                  <span className="flex items-center gap-1 text-sky-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-300" /> Bảo hành tròng Zeiss / Essilor
                  </span>
                  <span className="bg-[#0b537c] px-2 py-0.5 rounded text-[10px] text-white">20+ Chi Nhánh</span>
                </div>
              </div>

              {/* 3 Value bullets */}
              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Tự động thông báo lịch tái khám khúc xạ định kỳ (FR-CUS-08)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Tích điểm OptiPoint & nâng hạng thẻ VIP Loyalty tức thì</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Đặt lịch đo khám ưu tiên không chờ đợi tại mọi điểm bán</span>
                </div>
              </div>
            </div>

            {/* Micro compliance text */}
            <div className="relative z-10 pt-4 border-t border-sky-400/20 text-[10px] text-slate-400 flex items-center justify-between">
              <span>OptiVision OS v1.0</span>
              <span>Encrypted Clinical Dispatch</span>
            </div>
          </div>

          {/* Right Column: Authentication Form (Ảnh 1) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Header Switcher: Đăng Nhập / Đăng Ký */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'login'
                        ? 'bg-[#074768] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đăng Nhập
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                      authMode === 'register'
                        ? 'bg-[#074768] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đăng Ký Mới
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit SSL</span>
                </div>
              </div>

              {/* Title */}
              <div className="mt-6 mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {authMode === 'login' ? 'Chào mừng quý khách trở lại' : 'Tạo tài khoản thành viên mới'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tra cứu đơn thị lực số, bảo hành tròng kính và quản lý lịch hẹn.
                </p>
              </div>

              {/* Auth Method Toggle Tabs */}
              <div className="flex border-b border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all mr-6 ${
                    loginMethod === 'otp'
                      ? 'border-[#074768] text-[#074768]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Số Điện Thoại & OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                    loginMethod === 'password'
                      ? 'border-[#074768] text-[#074768]'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email & Mật Khẩu</span>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full name field for register */}
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Họ và tên khách hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[#074768] focus:bg-white transition"
                    />
                  </div>
                )}

                {/* Method 1: SĐT & OTP */}
                {loginMethod === 'otp' ? (
                  <>
                    {/* Phone Number Group */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Số điện thoại khách hàng
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 shrink-0">
                          <span>VN +84</span>
                        </div>
                        <input
                          type="tel"
                          placeholder="912 345 678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-[#074768] focus:bg-white transition"
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="bg-[#074768] hover:bg-[#09577f] text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 transition"
                        >
                          <span>Gửi OTP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* OTP 6 digits row */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700">Mã xác thực 6 chữ số (OTP)</span>
                        <div className="flex items-center gap-3">
                          <button type="button" className="text-slate-400 hover:text-slate-600">
                            Quên mật khẩu?
                          </button>
                          <span className="text-[#074768] font-semibold">
                            Gửi lại sau {countdown}s
                          </span>
                        </div>
                      </div>

                      {/* 6 Square Inputs */}
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-box-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            className="w-11 h-12 sm:w-13 sm:h-14 text-center font-bold text-lg sm:text-xl text-[#074768] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#074768] focus:bg-white focus:ring-2 focus:ring-[#97d7ff] transition"
                          />
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Mã SMS đang gửi về số điện thoại đăng ký tại phòng khám.
                      </p>
                    </div>
                  </>
                ) : (
                  /* Method 2: Email & Mật Khẩu */
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        placeholder="customer@optivision.vn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[#074768] focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <label className="font-bold text-slate-700">Mật khẩu</label>
                        <button type="button" className="text-[#074768] font-semibold">
                          Quên mật khẩu?
                        </button>
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[#074768] focus:bg-white transition"
                      />
                    </div>
                  </>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#074768] hover:bg-[#09577f] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#074768]/20 flex items-center justify-center gap-2 transition active:scale-98"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>
                    {authMode === 'login' ? 'Đăng Nhập Khách Hàng' : 'Tạo Tài Khoản Ngay'}
                  </span>
                </button>

                {/* Social Login Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-center">
                    <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      HOẶC TIẾP TỤC VỚI
                    </span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Đăng nhập Google thành công!')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Đăng nhập Apple ID thành công!')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                  >
                    <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.7-14.42-6.19-9.87-11.03-21.2-14.52-34-3.48-12.79-5.22-24.9-5.22-36.33 0-14.6 3.65-26.69 10.96-36.26 7.3-9.57 16.48-14.42 27.53-14.54 4.58 0 9.87 1.25 15.86 3.75 6 2.5 10.15 3.78 12.46 3.84 1.74 0 5.92-1.34 12.54-4.01 6.62-2.67 12.18-3.86 16.68-3.56 12.63.65 22.75 5.41 30.36 14.28-11.1 6.75-16.54 16.03-16.32 27.84.22 9.14 3.82 16.82 10.8 23.05 6.98 6.22 15.22 9.81 24.72 10.77-2.17 6.32-4.57 12.44-7.21 18.36zM119.22 33.15c0-7.18 2.61-13.91 7.84-20.19 5.23-6.28 11.66-10.37 19.3-12.27.65 1.52.98 3.14.98 4.88 0 7.18-2.67 14.15-8.01 20.9-5.34 6.75-11.83 10.66-19.47 11.75-.22-1.74-.64-3.43-.64-5.07z" />
                    </svg>
                    <span>Apple ID</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Disclaimer Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
              <span>ISO/IEC/IEEE 29148:2018 Compliant</span>
              <div className="flex gap-3">
                <span className="hover:text-slate-600 cursor-pointer">Security Notice</span>
                <span>•</span>
                <span className="hover:text-slate-600 cursor-pointer">Dispensing Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

