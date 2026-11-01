import React, { useState } from 'react';
import { 
  Award, 
  Gift, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  ChevronRight, 
  Filter, 
  Download, 
  Tag, 
  ShieldCheck, 
  Eye, 
  Wrench, 
  Users, 
  Calendar, 
  Layers, 
  Percent, 
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function VoucherLoyaltyPage({ setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  const vouchers = [
    {
      id: 1,
      code: 'BOLON200K',
      category: 'frame',
      badge: 'Combo Gọng & Tròng',
      badgeColor: 'bg-blue-50 text-[#074768] border-blue-200',
      expiry: 'HSD: 30/04/2026',
      expiryColor: 'text-amber-600',
      title: 'GIẢM 200.000đ - Trọn Bộ Gọng Bolon & Tròng Crizal',
      desc: 'Áp dụng cho đơn hàng gọng + tròng từ 2.000.000đ',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=300&q=80',
      type: 'image'
    },
    {
      id: 2,
      code: 'FREELAB2026',
      category: 'service',
      badge: 'Dịch Vụ Khúc Xạ Kỹ Thuật Số',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      expiry: 'Còn 15 ngày',
      expiryColor: 'text-amber-600',
      title: 'MIỄN PHÍ CẮT MÀI LẮP TRÒNG KỸ THUẬT SỐ 3D',
      desc: 'Tiết kiệm 150.000đ • Áp dụng mọi tròng đơn và đa tròng',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
      type: 'image'
    },
    {
      id: 3,
      code: 'TRANSITION15',
      category: 'lens',
      badge: 'Đặc Quyền Hội Viên VIP',
      badgeColor: 'bg-blue-50 text-[#074768] border-blue-200',
      expiry: 'HSD: 15/05/2026',
      expiryColor: 'text-slate-500',
      title: 'GIẢM 15% ĐƠN TRÒNG ĐỔI MÀU TRANSITIONS GEN S',
      desc: 'Bảo vệ mắt toàn diện khỏi tia UV và ánh sáng xanh có hại',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
      type: 'image'
    },
    {
      id: 4,
      code: 'REVIEW50K',
      category: 'service',
      badge: 'Thưởng Đánh Giá',
      badgeColor: 'bg-blue-50 text-[#074768] border-blue-200',
      expiry: 'HSD: 31/12/2026',
      expiryColor: 'text-slate-500',
      title: 'VOUCHER 50.000đ - THƯỞNG ĐÁNH GIÁ REVIEW KÍNH',
      desc: 'Cấp tự động từ đơn hàng #OPT-8842-SG • Không giới hạn giá trị',
      icon: Gift,
      type: 'icon'
    },
    {
      id: 5,
      code: 'SPATITAN',
      category: 'service',
      badge: 'Chăm Sóc & Bảo Dưỡng',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      expiry: 'Không giới hạn HSD',
      expiryColor: 'text-emerald-600',
      title: 'COMBO VỆ SINH SIÊU ÂM + THAY ĐỆM MŨI TITAN',
      desc: 'Trị giá 50.000đ • Áp dụng tại toàn bộ 16 chi nhánh showroom',
      icon: Sparkles,
      type: 'icon'
    },
    {
      id: 6,
      code: 'FRIEND100',
      category: 'frame',
      badge: 'Giới Thiệu Bạn Bè',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      expiry: 'HSD: 30/06/2026',
      expiryColor: 'text-slate-500',
      title: 'GIẢM 100.000đ - TẶNG BẠN MỚI CHO LẦN ĐO MẮT',
      desc: 'Áp dụng khi đi cùng hoặc giới thiệu bạn bè đo thị lực y khoa',
      icon: Users,
      type: 'icon'
    }
  ];

  const filteredVouchers = vouchers.filter((v) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'frame') return v.category === 'frame';
    if (activeFilter === 'lens') return v.category === 'lens';
    if (activeFilter === 'service') return v.category === 'service';
    if (activeFilter === 'used') return false; // Không có voucher đã dùng hiện tại
    return true;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      setCouponMessage({ type: 'error', text: 'Vui lòng nhập mã voucher cá nhân' });
      return;
    }
    const found = vouchers.find(v => v.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (found) {
      setCouponMessage({ type: 'success', text: `Đã kích hoạt thành công voucher ${found.code} vào ví của bạn!` });
      setCouponInput('');
    } else {
      setCouponMessage({ type: 'error', text: 'Mã voucher không hợp lệ hoặc đã hết lượt sử dụng.' });
    }
    setTimeout(() => setCouponMessage(null), 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <span className="hover:text-[#074768] cursor-pointer" onClick={() => setActiveTab('home')}>Trang Chủ</span>
              <span>/</span>
              <span className="text-slate-400">Tài Khoản & Hội Viên</span>
              <span>/</span>
              <span className="text-[#074768] font-bold">Kho Voucher & Điểm Thưởng VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#e0f2fe] text-[#074768] text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wide uppercase">
                FR-APP-13 • FR-CUS-07
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hệ Thống Tích Điểm Chuẩn Khúc Xạ Y Khoa
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Kho Voucher & Trung Tâm Điểm Thưởng OptiVIP
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Đặc quyền dành riêng cho thành viên OptiVision: tích lũy điểm khi mua sắm, nhận voucher đặc quyền lắp tròng và gọng kính chính hãng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('policy')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:border-[#074768] hover:text-[#074768] shadow-sm transition"
            >
              <ShieldCheck className="w-4 h-4 text-[#074768]" />
              Chính Sách Điểm Thưởng
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#074768] hover:bg-[#085a85] text-xs font-bold text-white shadow-md shadow-[#074768]/20 transition"
            >
              <Sparkles className="w-4 h-4 text-[#97d7ff]" />
              Khám Phá Kính Mới
            </button>
          </div>
        </div>

        {/* Top 2 Cards: Platinum Card & 4 Privileges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Platinum RFID Digital Membership Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#04263b] via-[#074768] to-[#0d5c87] rounded-2xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Background design elements */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
              <Eye className="w-44 h-44 text-white" />
            </div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-300/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base tracking-wide">OptiClub Platinum Card</span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">VIP 3</span>
                    </div>
                    <div className="text-[10px] tracking-wider uppercase font-semibold text-cyan-200">
                      Hạng Bạch Kim Chuyên Sâu
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10px] font-mono text-cyan-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  RFID READY
                </div>
              </div>

              {/* Owner and Points */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[11px] text-cyan-200 uppercase tracking-wider font-semibold">Chủ Sở Hữu Thẻ</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">Nguyễn Hoàng Duy</div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-100/80 font-mono mt-1">
                    <span>Mã thẻ: #VIP-OPT-9842</span>
                    <button 
                      onClick={() => handleCopyCode('VIP-OPT-9842')} 
                      className="hover:text-white"
                      title="Sao chép mã thẻ"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-cyan-200 uppercase tracking-wider font-semibold">Điểm Tích Lũy Khả Dụng</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight mt-0.5">
                    1,450 <span className="text-sm font-semibold text-white">OptiPoints</span>
                  </div>
                  <div className="text-[11px] text-cyan-100/90 font-medium mt-1">
                    ~ 145.000đ khi thanh toán đơn tròng & gọng
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Progress Bar */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-cyan-200">Tiến trình thăng hạng Diamond Tier</span>
                <span className="font-mono font-bold text-amber-300">1,450 / 2,000 pts <span className="text-cyan-200 font-normal">(Còn 550 pts)</span></span>
              </div>
              
              {/* Progress bar container */}
              <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-amber-300 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${(1450 / 2000) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-cyan-200/80 mt-1.5">
                <span>Platinum Member</span>
                <span>Diamond Elite (Hạn mức 2,000 pts)</span>
              </div>
            </div>
          </div>

          {/* Card 2: 4 Privileges & Rewards Box */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#074768] flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#074768]" />
                  </div>
                  <h2 className="font-black text-slate-900 text-sm sm:text-base">4 Đặc Quyền Hạng Platinum</h2>
                </div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  Hiệu lực: 2026
                </span>
              </div>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-[#074768] flex items-center justify-center">
                      <Percent className="w-3 h-3" />
                    </div>
                    <span>Tích 5% Giá Trị</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Tự động cộng cho mỗi đơn gọng & tròng kính.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-[#074768] flex items-center justify-center">
                      <Layers className="w-3 h-3" />
                    </div>
                    <span>Miễn Phí Mài Tròng 3D</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Áp dụng tròng Essilor / Zeiss 2 lần/năm.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-md bg-blue-100 text-[#074768] flex items-center justify-center">
                      <Eye className="w-3 h-3" />
                    </div>
                    <span>Đo Khúc Xạ Ưu Tiên</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Quy trình 12 bước với chuyên viên, không chờ đợi.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Gift className="w-3 h-3" />
                    </div>
                    <span>Quà Tặng Sinh Nhật</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Voucher 200.000đ tặng vào 1 áp dụng tháng sinh nhật.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Reward Exchange Banner */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-50/70 to-cyan-50/70 p-3 rounded-xl">
              <div>
                <div className="text-xs font-bold text-[#074768] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  Đổi Điểm Lấy Quà Độc Quyền
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Khăn lau nano cao cấp, hộp da handmade, chai xịt vệ sinh tròng.
                </div>
              </div>
              <button 
                onClick={() => setShowGiftModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#074768] hover:bg-[#085a85] text-white text-xs font-bold shrink-0 transition"
              >
                Xem Quà Tặng
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Coupon Redeem Form */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeFilter === 'all'
                  ? 'bg-[#074768] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất Cả Voucher ({vouchers.length})
            </button>
            <button
              onClick={() => setActiveFilter('frame')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeFilter === 'frame'
                  ? 'bg-[#074768] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ưu Đãi Gọng Kính (2)
            </button>
            <button
              onClick={() => setActiveFilter('lens')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeFilter === 'lens'
                  ? 'bg-[#074768] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ưu Đãi Tròng Kính (2)
            </button>
            <button
              onClick={() => setActiveFilter('service')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeFilter === 'service'
                  ? 'bg-[#074768] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Đo Khám & Spa Kính (2)
            </button>
            <button
              onClick={() => setActiveFilter('used')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeFilter === 'used'
                  ? 'bg-[#074768] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lịch Sử Đã Dùng
            </button>
          </div>

          {/* Redeem Voucher Input */}
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="NHẬP MÃ VOUCHER CÁ NHÂN"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-wider placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:border-[#074768]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#074768] hover:bg-[#085a85] text-white text-xs font-bold rounded-xl whitespace-nowrap transition shrink-0"
            >
              Áp dụng vào ví
            </button>
          </form>
        </div>

        {/* Alert feedback for coupon */}
        {couponMessage && (
          <div className={`p-3.5 rounded-xl text-xs font-bold ${
            couponMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {couponMessage.text}
          </div>
        )}

        {/* Voucher Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#074768]"></span>
              Danh Sách Voucher Khả Dụng
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer">
              <span>Sắp xếp theo: Hạn sử dụng gần nhất</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {filteredVouchers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <Tag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-bold text-sm">Chưa có voucher nào trong danh mục này</p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="mt-3 text-xs text-[#074768] font-bold hover:underline"
              >
                Xem lại tất cả voucher khả dụng
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVouchers.map((v) => (
                <div 
                  key={v.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${v.badgeColor}`}>
                        {v.badge}
                      </span>
                      <span className={`text-[10px] font-semibold flex items-center gap-1 ${v.expiryColor}`}>
                        <Clock className="w-3 h-3" />
                        {v.expiry}
                      </span>
                    </div>

                    {/* Middle: Image/Icon + Title */}
                    <div className="flex items-start gap-3.5 mb-3">
                      {v.type === 'image' ? (
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[#e0f2fe] text-[#074768] flex items-center justify-center shrink-0 border border-blue-200">
                          <v.icon className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                          {v.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Coupon Code + Action Buttons */}
                  <div className="pt-3.5 border-t border-slate-100">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium mb-1.5">
                      <span>MÃ KHUYẾN MÃI</span>
                      <span className="font-mono font-bold text-slate-800 tracking-wider">{v.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(v.code)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        {copiedCode === v.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao Chép</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          handleCopyCode(v.code);
                          setActiveTab('products');
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#074768] hover:bg-[#085a85] text-white text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95 shadow-sm"
                      >
                        Dùng Ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Points Transaction History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#074768]" />
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Lịch Sử Biến Động Điểm Thưởng
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Minh bạch mọi giao dịch tích lũy điểm và đổi quà tại hệ thống
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
                <Filter className="w-3.5 h-3.5" />
                Lọc theo thời gian
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
                <Download className="w-3.5 h-3.5" />
                Xuất PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">THỜI GIAN</th>
                  <th className="py-3 px-4">LOẠI GIAO DỊCH</th>
                  <th className="py-3 px-4">MÔ TẢ CHI TIẾT & MÃ THAM CHIẾU</th>
                  <th className="py-3 px-4 text-right">BIẾN ĐỘNG ĐIỂM</th>
                  <th className="py-3 px-4 text-right">SỐ DƯ SAU CÙNG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                    14/03/2026 14:22
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-[#074768] font-bold text-[10px] px-2 py-0.5 rounded-full border border-blue-200">
                      <Sparkles className="w-2.5 h-2.5" />
                      Thưởng Đánh Giá Review
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      Thưởng đánh giá đơn hàng kính Bolon kèm ảnh trải nghiệm thực tế
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Tham chiếu: REV-BOLON-7721 • Chi nhánh Flagship Q.1
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm whitespace-nowrap">
                    +500 pts
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                    1,450 pts
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                    12/03/2026 11:05:42
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-cyan-200">
                      <Percent className="w-2.5 h-2.5" />
                      Tích Lũy 5% Đơn Hàng
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      Tích lũy 5% từ thanh toán trọn bộ gọng titan & tròng đa tròng Crizal
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Đơn hàng: #OPT-8842-SG • Giá trị: 6.330.000đ
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600 text-sm whitespace-nowrap">
                    +950 pts
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                    950 pts
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                    01/02/2026 10:18:00
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-200">
                      <Gift className="w-2.5 h-2.5" />
                      Đổi Voucher Quà Tặng
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      Đổi voucher giảm giá 50.000đ phụ kiện hộp đựng da thủ công cao cấp
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Mã phát hành: RDM-BOX50-V3
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-red-500 text-sm whitespace-nowrap">
                    -200 pts
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                    0 pts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500 mt-3">
            <span>Hiển thị 3 trên tổng số 12 giao dịch tích lũy điểm</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400">
                &lt;
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#074768] text-white font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* 2 Bottom Call-to-Action Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: New collection to use vouchers */}
          <div className="bg-gradient-to-r from-slate-100 to-blue-50/60 rounded-2xl p-6 border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-[#074768] uppercase bg-white px-2 py-0.5 rounded shadow-sm">
                BỘ SƯU TẬP MỚI 2026
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                Khám Phá Kính Mới Để Dùng Voucher
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                Hơn 450 mẫu gọng kính Titanium & Acetate nguyên khối từ Ray-Ban, Bolon, Silhouette sẵn sàng áp mã giảm 200.000đ.
              </p>
              <button 
                onClick={() => setActiveTab('products')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#074768] hover:bg-[#085a85] text-white text-xs font-bold transition shadow-sm"
              >
                Đến Kho Gọng Kính
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shrink-0 shadow-md border border-white">
              <img 
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80" 
                alt="Bộ sưu tập kính mới" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Banner 2: Redeem points for gifts */}
          <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl p-6 border border-blue-200 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest text-cyan-800 uppercase bg-white px-2 py-0.5 rounded shadow-sm">
                ĐỔI THƯỞNG LINH HOẠT
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                Đổi Điểm Lấy Quà Độc Quyền
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                Sử dụng 1,450 OptiPoints của bạn để nhận ngay các phụ kiện chăm sóc thị lực cao cấp hoặc trừ trực tiếp vào hóa đơn đo mắt.
              </p>
              <button 
                onClick={() => setShowGiftModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition shadow-sm"
              >
                Đổi Điểm Ngay (1,450 pts)
                <Gift className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shrink-0 shadow-md border border-white">
              <img 
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80" 
                alt="Phụ kiện cao cấp" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#074768]" />
                <h3 className="font-extrabold text-slate-900 text-base">Đổi Quà Tặng Bằng OptiPoints</h3>
              </div>
              <button 
                onClick={() => setShowGiftModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#074768] transition cursor-pointer">
                <div>
                  <div className="font-bold text-slate-800">Khăn lau kính Nano chống bám hơi nước</div>
                  <div className="text-[11px] text-slate-500">Hiệu quả 48h, tái sử dụng 300 lần</div>
                </div>
                <button 
                  onClick={() => {
                    alert('Đã đổi thành công Khăn lau Nano! Mã nhận quà tại quầy: GIFT-NANO-8842');
                    setShowGiftModal(false);
                  }}
                  className="px-3 py-1 bg-[#074768] text-white font-bold rounded-lg text-xs"
                >
                  300 pts
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#074768] transition cursor-pointer">
                <div>
                  <div className="font-bold text-slate-800">Chai xịt vệ sinh tròng kính Essilor Lens Cleaner</div>
                  <div className="text-[11px] text-slate-500">Dung tích 60ml tiêu chuẩn quang học</div>
                </div>
                <button 
                  onClick={() => {
                    alert('Đã đổi thành công Chai xịt Essilor! Mã nhận quà tại quầy: GIFT-ESS-60ML');
                    setShowGiftModal(false);
                  }}
                  className="px-3 py-1 bg-[#074768] text-white font-bold rounded-lg text-xs"
                >
                  500 pts
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#074768] transition cursor-pointer">
                <div>
                  <div className="font-bold text-slate-800">Hộp đựng kính da bò thật Handmade cao cấp</div>
                  <div className="text-[11px] text-slate-500">Khắc tên laser độc quyền miễn phí</div>
                </div>
                <button 
                  onClick={() => {
                    alert('Đã đổi thành công Hộp da bò thủ công! Mã nhận quà tại quầy: GIFT-LEATHER-VIP');
                    setShowGiftModal(false);
                  }}
                  className="px-3 py-1 bg-[#074768] text-white font-bold rounded-lg text-xs"
                >
                  1,200 pts
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button 
                onClick={() => setShowGiftModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

