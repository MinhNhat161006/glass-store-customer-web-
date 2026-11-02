import React, { useState, useEffect, useRef } from 'react';
import {
  Eye, ShieldCheck, CheckCircle2, Lock, X, Phone, Mail, Loader2, AlertCircle, ArrowLeft
} from 'lucide-react';

// API Base URL - đi qua API Gateway (port 8080)
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login');      // 'login' | 'register' | 'otp'
  const [loginMethod, setLoginMethod] = useState('password'); // 'otp' | 'password'

  // Form state
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits]     = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown]     = useState(0);
  const inputRefs = useRef([]);

  // UI state
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail(''); setPassword(''); setFullName(''); setPhoneNumber('');
    setOtpDigits(['', '', '', '', '', '']);
    setError(''); setSuccess(''); setLoading(false); setCountdown(0);
  };

  const handleTabSwitch = (mode) => {
    setAuthMode(mode);
    resetForm();
  };

  // ─── OTP input handling ──────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...otpDigits];
    pasted.split('').forEach((ch, i) => { newDigits[i] = ch; });
    setOtpDigits(newDigits);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  // ─── API Calls ───────────────────────────────────────────────────────────

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!email || !password || !fullName) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.'); return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.'); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phoneNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại');
      setSuccess('Đăng ký thành công! Mã OTP đã được gửi về email của bạn.');
      setCountdown(300); // 5 min countdown
      setAuthMode('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setError('Vui lòng nhập đủ 6 chữ số mã OTP.'); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Xác thực OTP thất bại');

      // Auto-login after OTP verification
      const { accessToken, refreshToken, user } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError(''); setSuccess(''); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gửi lại OTP thất bại');
      setSuccess('Mã OTP mới đã được gửi. Vui lòng kiểm tra email.');
      setOtpDigits(['', '', '', '', '', '']);
      setCountdown(300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu.'); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');

      const { accessToken, refreshToken, user } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    } catch (err) {
      // Phân loại lỗi cụ thể
      const msg = err.message || '';
      if (msg.includes('khóa') || msg.includes('bị tạm khóa')) {
        setError(`🔒 ${msg}`);
      } else if (msg.includes('chưa được kích hoạt')) {
        setError(`⚠️ ${msg}`);
        // Offer to go to OTP verify
        setTimeout(() => setAuthMode('otp'), 2000);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── Render helpers ──────────────────────────────────────────────────────

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderOtpScreen = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Xác Thực Mã OTP</h2>
        <p className="text-sm text-slate-500 mt-1">
          Mã xác thực 6 chữ số đã được gửi tới <strong className="text-[#074768]">{email}</strong>
        </p>
      </div>

      {/* 6-digit OTP boxes */}
      <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
        {otpDigits.map((d, i) => (
          <input
            key={i}
            ref={el => inputRefs.current[i] = el}
            id={`otp-box-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleOtpKeyDown(i, e)}
            className={`w-11 h-14 text-center text-xl font-black border-2 rounded-xl outline-none transition-all focus:border-[#074768] focus:ring-2 focus:ring-[#074768]/20 ${
              d ? 'border-[#074768] bg-[#e0f2fe] text-[#074768]' : 'border-slate-200 bg-slate-50'
            }`}
          />
        ))}
      </div>

      {/* Resend timer */}
      <div className="text-center text-xs text-slate-500">
        {countdown > 0 ? (
          <span>Gửi lại mã sau <strong className="font-mono text-[#074768]">{formatCountdown(countdown)}</strong></span>
        ) : (
          <button type="button" onClick={handleResendOtp} disabled={loading}
            className="text-[#074768] font-bold hover:underline disabled:opacity-50">
            Gửi lại mã OTP
          </button>
        )}
      </div>

      {error  && <AlertBox type="error" msg={error} />}
      {success && <AlertBox type="success" msg={success} />}

      <button type="submit" disabled={loading || otpDigits.join('').length < 6}
        className="w-full py-3 bg-[#074768] hover:bg-[#085a85] text-white rounded-xl font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-md">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
        {loading ? 'Đang xác thực...' : 'Xác Nhận & Kích Hoạt Tài Khoản'}
      </button>

      <button type="button" onClick={() => setAuthMode('register')}
        className="w-full text-xs text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại đăng ký
      </button>
    </form>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Chào mừng quý khách trở lại</h2>
        <p className="text-xs text-slate-500 mt-1">Tra cứu đơn thị lực số, bảo hành tròng kính và quản lý lịch hẹn.</p>
      </div>

      {/* Login method toggle */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
        {[{ id: 'password', label: 'Email & Mật Khẩu', icon: Mail },
          { id: 'otp', label: 'Số ĐT & OTP', icon: Phone }].map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => setLoginMethod(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              loginMethod === id ? 'bg-white text-[#074768] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {loginMethod === 'password' ? (
        <>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email khách hàng</label>
            <input
              type="email" required value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#074768] focus:ring-2 focus:ring-[#074768]/10 bg-slate-50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} required value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Mật khẩu đăng ký"
                className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#074768] focus:ring-2 focus:ring-[#074768]/10 bg-slate-50"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 bg-blue-50 rounded-xl text-sm text-[#074768] font-medium border border-blue-200">
          Tính năng đăng nhập OTP qua số điện thoại đang được triển khai.
          Vui lòng sử dụng <strong>Email & Mật Khẩu</strong>.
        </div>
      )}

      {error  && <AlertBox type="error" msg={error} />}
      {success && <AlertBox type="success" msg={success} />}

      <button type="submit" disabled={loading || loginMethod === 'otp'}
        className="w-full py-3 bg-[#074768] hover:bg-[#085a85] text-white rounded-xl font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-md">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {loading ? 'Đang đăng nhập...' : '→ Đăng Nhập Khách Hàng'}
      </button>

      {/* Social login divider */}
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="flex-1 h-px bg-slate-200" />
        HOẶC TIẾP TỤC VỚI
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['🇬 Google', '#EA4335'], ['🍎 Apple ID', '#000000']].map(([label, color]) => (
          <button key={label} type="button"
            onClick={() => setError('Đăng nhập mạng xã hội đang được tích hợp OAuth2.')}
            className="py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
            {label}
          </button>
        ))}
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Tạo Tài Khoản Mới</h2>
        <p className="text-xs text-slate-500 mt-1">Mã OTP xác thực sẽ được gửi tới email đăng ký của bạn.</p>
      </div>

      {[
        { label: 'Họ và tên *', value: fullName, setter: setFullName, type: 'text', placeholder: 'Nguyễn Văn A' },
        { label: 'Email *', value: email, setter: setEmail, type: 'email', placeholder: 'email@example.com' },
        { label: 'Số điện thoại', value: phoneNumber, setter: setPhoneNumber, type: 'tel', placeholder: '0912 345 678' },
      ].map(({ label, value, setter, type, placeholder }) => (
        <div key={label} className="space-y-1">
          <label className="text-xs font-bold text-slate-700">{label}</label>
          <input type={type} value={value} onChange={e => { setter(e.target.value); setError(''); }}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#074768] focus:ring-2 focus:ring-[#074768]/10 bg-slate-50"
          />
        </div>
      ))}

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Mật khẩu * (ít nhất 6 ký tự)</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            placeholder="Tối thiểu 6 ký tự"
            className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#074768] focus:ring-2 focus:ring-[#074768]/10 bg-slate-50"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showPassword ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {password.length > 0 && (
          <div className="flex gap-1 mt-1">
            {['Yếu', 'Trung bình', 'Mạnh'].map((level, i) => (
              <div key={level} className={`h-1 flex-1 rounded-full ${
                password.length >= (i + 1) * 3 ? (i === 2 ? 'bg-emerald-500' : i === 1 ? 'bg-amber-400' : 'bg-red-400') : 'bg-slate-200'
              }`} />
            ))}
          </div>
        )}
      </div>

      {error  && <AlertBox type="error" msg={error} />}
      {success && <AlertBox type="success" msg={success} />}

      <button type="submit" disabled={loading}
        className="w-full py-3 bg-[#074768] hover:bg-[#085a85] text-white rounded-xl font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-md">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
        {loading ? 'Đang đăng ký...' : 'Đăng Ký & Gửi OTP Xác Thực'}
      </button>
    </form>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          aria-label="Đóng">
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Clinical Brand Showcase */}
          <div className="lg:col-span-5 bg-[#063c59] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-sky-400/20 pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0d547a] text-sky-200 border border-sky-400/30">
                <Eye className="w-3.5 h-3.5 text-sky-300" /> OPTIVISION RETAIL & EYECARE
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                  Hệ Thống Mắt Kính <br /><span className="text-[#38bdf8]">Đa Kênh</span>
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Giải pháp chăm sóc thị giác chuẩn nhãn khoa kết hợp trải nghiệm mua sắm kính mắt thời trang cá nhân hóa cao cấp.
                </p>
              </div>

              <div className="bg-[#08486b] rounded-2xl p-4 border border-sky-400/25 shadow-lg">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-sky-400/20 text-xs font-bold text-sky-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Hồ Sơ Thị Lực Điện Tử (OD / OS)
                  </span>
                  <span className="text-[10px] text-slate-300">Live Sync</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium text-slate-300 mb-1">
                  <div>MẮT</div><div>SPH (CẦU)</div><div>CYL (TRỤ)</div><div>AXIS / PD</div>
                </div>
                {[['OD (Phải)', '-2.25', '-0.75', '175°'], ['OS (Trái)', '-2.00', '-0.50', '63.5 mm']].map(([eye, sph, cyl, axis]) => (
                  <div key={eye} className="grid grid-cols-4 gap-2 text-center text-xs py-1.5 bg-[#05324c]/60 rounded-lg font-mono font-bold mb-1 items-center">
                    <div className="text-sky-300 font-sans text-[11px]">{eye}</div>
                    <div className="text-white">{sph}</div><div className="text-white">{cyl}</div>
                    <div className="text-sky-200">{axis}</div>
                  </div>
                ))}
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-sky-400/20 bg-slate-800">
                <img src="https://images.unsplash.com/photo-1582142839970-2b9da988941f?auto=format&fit=crop&w=600&q=80"
                  alt="Phòng Lab" className="w-full h-24 object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063c59] via-transparent to-transparent flex items-end justify-between p-3 text-[11px] font-semibold text-slate-200">
                  <span className="flex items-center gap-1 text-sky-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-300" /> Bảo hành tròng Zeiss / Essilor
                  </span>
                  <span className="bg-[#0b537c] px-2 py-0.5 rounded text-[10px] text-white">20+ Chi Nhánh</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                {[
                  'Tự động thông báo lịch tái khám khúc xạ định kỳ',
                  'Tích điểm OptiPoint & nâng hạng thẻ VIP Loyalty',
                  'Đặt lịch đo khám ưu tiên không chờ đợi tại mọi điểm bán',
                ].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 pt-4 border-t border-sky-400/20 text-[10px] text-slate-400 flex justify-between">
              <span>OptiVision OS v1.0</span>
              <span>256-bit SSL • Encrypted</span>
            </div>
          </div>

          {/* Right Column: Auth forms */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Tab switcher — hidden on OTP screen */}
              {authMode !== 'otp' && (
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                    {[{ id: 'login', label: 'Đăng Nhập' }, { id: 'register', label: 'Đăng Ký Mới' }].map(({ id, label }) => (
                      <button key={id} type="button" onClick={() => handleTabSwitch(id)}
                        className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                          authMode === id ? 'bg-[#074768] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-bit SSL
                  </span>
                </div>
              )}

              {authMode === 'login'    && renderLoginForm()}
              {authMode === 'register' && renderRegisterForm()}
              {authMode === 'otp'      && renderOtpScreen()}
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 text-[10px] text-slate-400 text-center space-y-1">
              <p>OptiVision OS v1.0 • ISO/IEC/IEEE 29148:2018 Optical Specification Compliant</p>
              <p>© 2025 OptiVision Retail Inc. | <span className="hover:underline cursor-pointer">Chính Sách Bảo Mật</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Alert Box Helper ────────────────────────────────────────────────────────
function AlertBox({ type, msg }) {
  const isError = type === 'error';
  return (
    <div className={`flex items-start gap-2.5 p-3 rounded-xl text-xs font-semibold border ${
      isError ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }`}>
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{msg}</span>
    </div>
  );
}
