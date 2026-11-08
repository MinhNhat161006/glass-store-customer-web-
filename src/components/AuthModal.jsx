import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { Eye, EyeOff, ShieldCheck, CheckCircle2, Lock, ArrowRight, X, Mail, User, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage('');
    setSuccessMessage('');

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setErrorMessage('Vui lòng nhập họ và tên!');
        return;
      }
      if (!email.trim()) {
        setErrorMessage('Vui lòng nhập địa chỉ email!');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Mật khẩu phải có độ dài tối thiểu 6 ký tự!');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Mật khẩu xác nhận không khớp!');
        return;
      }

      setLoading(true);
      try {
        const res = await authApi.register({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password,
          phoneNumber: phoneNumber.trim() || null
        });

        setSuccessMessage('Đăng ký tài khoản thành công! Tài khoản của bạn đã được kích hoạt (ACTIVE). Bạn có thể đăng nhập ngay.');
        setAuthMode('login');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        setErrorMessage(err.message || 'Đăng ký không thành công. Vui lòng kiểm tra lại thông tin!');
      } finally {
        setLoading(false);
      }
    } else {
      // Login mode
      if (!email.trim() || !password) {
        setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu!');
        return;
      }

      setLoading(true);
      try {
        const data = await authApi.login({
          email: email.trim(),
          password: password
        });

        const userProfile = {
          ...data,
          name: data.fullName || 'Khách Hàng',
          email: data.email,
          phone: data.phoneNumber || '',
          roles: data.roles
        };

        if (onLoginSuccess) {
          onLoginSuccess(userProfile);
        }
        onClose();
      } catch (err) {
        setErrorMessage(err.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Clinical & Brand Showcase */}
          <div className="lg:col-span-5 bg-[#063c59] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background decorative circles */}
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
                  <span className="text-[#38bdf8]">Đa Kênh Chuẩn Y Khoa</span>
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Lưu trữ đơn kính khúc xạ số, theo dõi tiến độ gia công xưởng Lab và đồng bộ quyền lợi thành viên trực tuyến.
                </p>
              </div>

              {/* Electronic Prescription Card */}
              <div className="bg-[#08486b] rounded-2xl p-4 border border-sky-400/25 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-sky-400/20 text-xs font-bold text-sky-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Hồ Sơ Thị Lực Số (OD / OS)
                  </span>
                  <span className="text-[10px] text-sky-300">ISO 29148</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#063c59] p-2 rounded-lg">
                    <div className="text-[10px] text-sky-300">OD (Phải)</div>
                    <div className="font-bold text-white mt-0.5">-2.25 D</div>
                  </div>
                  <div className="bg-[#063c59] p-2 rounded-lg">
                    <div className="text-[10px] text-sky-300">OS (Trái)</div>
                    <div className="font-bold text-white mt-0.5">-1.75 D</div>
                  </div>
                  <div className="bg-[#063c59] p-2 rounded-lg">
                    <div className="text-[10px] text-sky-300">Loạn (CYL)</div>
                    <div className="font-bold text-white mt-0.5">-0.50</div>
                  </div>
                  <div className="bg-[#063c59] p-2 rounded-lg">
                    <div className="text-[10px] text-sky-300">PD (Đồng tử)</div>
                    <div className="font-bold text-white mt-0.5">63 mm</div>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-sky-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Xác thực mật khẩu an toàn chuẩn mã hóa BCrypt</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-sky-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kích hoạt tài khoản ngay tức thì (ACTIVE) không cần OTP</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-sky-100">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tự động bảo vệ chống Brute Force sau 5 lần nhập sai</span>
                </div>
              </div>
            </div>

            {/* Bottom brand note */}
            <div className="relative z-10 pt-6 text-[11px] text-sky-300/80 border-t border-sky-400/20">
              Bảo mật đa lớp theo tiêu chuẩn Y Tế & Bán Lẻ Hiện Đại
            </div>
          </div>

          {/* Right Column: Clean Authentication Form (No OTP) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Tab selector */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => handleModeChange('login')}
                    className={`text-sm font-extrabold pb-3 -mb-3 transition border-b-2 ${
                      authMode === 'login'
                        ? 'text-[#063c59] border-[#063c59]'
                        : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                  >
                    Đăng Nhập
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('register')}
                    className={`text-sm font-extrabold pb-3 -mb-3 transition border-b-2 ${
                      authMode === 'register'
                        ? 'text-[#063c59] border-[#063c59]'
                        : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                  >
                    Đăng Ký Tài Khoản
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="mt-6 mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {authMode === 'login' ? 'Chào mừng quý khách trở lại' : 'Tạo tài khoản khách hàng mới'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {authMode === 'login'
                    ? 'Đăng nhập bằng email và mật khẩu để quản lý đơn kính và ưu đãi thành viên.'
                    : 'Đăng ký nhanh chóng bằng email và mật khẩu, kích hoạt ngay lập tức.'}
                </p>
              </div>

              {/* Alert Messages */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name (Register only) */}
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và tên khách hàng <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-[#063c59] focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Địa chỉ Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="customer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-[#063c59] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Phone Number (Optional for Register) */}
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số điện thoại (tùy chọn)
                    </label>
                    <input
                      type="tel"
                      placeholder="0912345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-[#063c59] focus:bg-white transition"
                    />
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tối thiểu 6 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-800 focus:outline-none focus:border-[#063c59] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register only) */}
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-[#063c59] focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-[#063c59] hover:bg-[#08486b] disabled:opacity-50 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-[#063c59]/20 flex items-center justify-center gap-2 transition active:scale-98"
                >
                  {loading ? (
                    <span>Đang xử lý...</span>
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'Đăng Nhập Khách Hàng' : 'Đăng Ký Tài Khoản'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-6">
              <span>Hệ thống bảo mật OptiVision Store</span>
              <span className="font-medium text-[#063c59]">Không yêu cầu mã OTP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
