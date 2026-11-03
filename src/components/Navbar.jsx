import React from 'react';
import { Eye, Bell, ShoppingBag, User, Phone, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, openAuthModal, openCart, currentUser, onLogout }) {
  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'products', label: 'Sản Phẩm' },
    { id: 'booking', label: 'Đặt Lịch Đo Mắt' },
    { id: 'records', label: 'Hồ Sơ Thị Lực' },
    { id: 'warranty', label: 'Tra Cứu Bảo Hành' },
    { id: 'orders', label: 'Đơn Hàng' },
    { id: 'stores', label: 'Cửa Hàng' },
    { id: 'vouchers', label: 'Ưu Đãi & VIP' },
    { id: 'policy', label: 'Chính Sách' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar */}
      <div className="bg-[#04334f] text-slate-200 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-[#0b5c87] text-[#97d7ff] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase">
              Hệ Thống Chuẩn Y Khoa
            </span>
            <span className="text-slate-300 text-xs">
              Đo thị lực khúc xạ 12 bước tiêu chuẩn quốc tế miễn phí 100%
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
              <Phone className="w-3 h-3 text-[#97d7ff]" /> Hotline hỗ trợ: <strong>1900 6868</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">16+ Showroom toàn quốc</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#074768] text-white flex items-center justify-center shadow-md shadow-[#074768]/20 group-hover:bg-[#09577f] transition">
            <Eye className="w-5 h-5 text-[#97d7ff]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#074768] leading-none">
              Opti<span className="text-[#38bdf8]">Vision</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mt-1">
              OMNICHANNEL EYEWEAR
            </span>
          </div>
        </div>

        {/* Center menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#074768] bg-[#e0f2fe] font-bold'
                    : 'text-slate-600 hover:text-[#074768] hover:bg-slate-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* Notifications button */}
          <button 
            onClick={() => setActiveTab('notifications')}
            aria-label="Thông báo"
            className={`relative p-2 rounded-full transition ${
              activeTab === 'notifications' 
                ? 'text-[#074768] bg-[#e0f2fe]' 
                : 'text-slate-600 hover:text-[#074768] hover:bg-slate-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="Giỏ hàng"
            className="relative p-2 text-slate-600 hover:text-[#074768] hover:bg-slate-100 rounded-full transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#074768] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / VIP Button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 bg-[#074768] text-white pl-3 pr-4 py-2 rounded-xl font-semibold shadow-md shadow-[#074768]/20 border border-[#97d7ff]/20">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center border border-white/20 flex-shrink-0">
                  <User className="w-4 h-4 text-[#97d7ff]" />
                </div>
                <div className="text-left hidden sm:flex flex-col justify-center">
                  <span className="text-[10px] text-[#97d7ff] uppercase font-bold tracking-wider leading-none">
                    {currentUser.tier || 'Thành Viên'}
                  </span>
                  <span className="text-xs font-bold text-white whitespace-nowrap mt-1 leading-none">
                    {currentUser.name || currentUser.fullName || 'Khách Hàng'}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Đăng xuất"
                className="p-2 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-1 border border-slate-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2.5 bg-[#074768] hover:bg-[#09577f] text-white px-4 py-2.5 rounded-xl font-semibold shadow-md shadow-[#074768]/20 transition-all active:scale-95 ml-2 border border-[#97d7ff]/20 min-w-[155px]"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center border border-white/20 flex-shrink-0">
                <User className="w-4 h-4 text-[#97d7ff]" />
              </div>
              <div className="text-left hidden sm:flex flex-col justify-center">
                <span className="text-[10px] text-[#97d7ff] uppercase font-bold tracking-wider leading-none">
                  Xác Thực
                </span>
                <span className="text-xs font-bold text-white whitespace-nowrap mt-1 leading-none">
                  Đăng Nhập / Đăng Ký
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation tab scroll */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition ${
              activeTab === item.id
                ? 'bg-[#074768] text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
