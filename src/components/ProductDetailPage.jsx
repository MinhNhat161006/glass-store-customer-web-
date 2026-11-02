import React, { useState } from 'react';
import { 
  Heart, Share2, Camera, MapPin, Star, ShieldCheck, 
  Truck, Clock, Check, ArrowRight, FileText, Upload, Sparkles, ChevronRight 
} from 'lucide-react';

export default function ProductDetailPage({ product, onAddToCart, setActiveTab }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('ROSE_GOLD');
  const [lensMode, setLensMode] = useState('WITH_LENS'); // 'FRAME_ONLY' | 'WITH_LENS'
  const [rxSource, setRxSource] = useState('LATEST_PROFILE'); // 'LATEST_PROFILE' | 'UPLOAD_RX' | 'STORE_EXAM'
  const [selectedLensPackage, setSelectedLensPackage] = useState('ESSILOR_167'); // 'ESSILOR_167' | 'CHEMI_160'
  const [activeSpecTab, setActiveSpecTab] = useState('SPECS'); // 'SPECS' | 'WARRANTY' | 'CARE'
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
  ];

  const basePrice = 5330000;
  const originalPrice = 6350000;
  const lensExtraPrice = lensMode === 'WITH_LENS' 
    ? (selectedLensPackage === 'ESSILOR_167' ? 1450000 : 650000) 
    : 0;
  const finalPrice = basePrice + lensExtraPrice;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleAddToCartClick = () => {
    const itemToAdd = {
      id: 99,
      sku: 'BOLON-BJ3120-B10',
      name: 'Kính Gọng Cận Nữ Titanium Bolon Graceful BJ3120 – Rose Gold Edition',
      price: finalPrice,
      image: images[activeImageIndex],
      lensConfig: lensMode === 'WITH_LENS' ? selectedLensPackage : 'FRAME_ONLY',
    };
    onAddToCart(itemToAdd);
  };

  const handleBuyNow = () => {
    handleAddToCartClick();
    alert('Đang chuyển tới cổng xác nhận thanh toán trực tiếp & hẹn giờ mài kính...');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Breadcrumb (Ảnh 4 & 5) */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
        <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
          Trang Chủ
        </span>
        <span>/</span>
        <span onClick={() => setActiveTab('products')} className="hover:text-[#074768] cursor-pointer">
          Danh Mục Gọng Kính
        </span>
        <span>/</span>
        <span className="text-slate-600">Kính Mắt Titanium</span>
        <span>/</span>
        <span className="text-[#074768] font-bold">Bolon Graceful BJ3120 Titanium Rose Gold</span>
      </nav>

      {/* 2. Main Product Section (2 Columns - Ảnh 4 & 5 chuẩn xác) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery & Try-On Actions */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo Frame */}
          <div className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs flex items-center justify-center p-6">
            <img
              src={images[activeImageIndex]}
              alt="Bolon Graceful BJ3120"
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-[#074768] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                Chính Hãng Phân Phối Độc Quyền
              </span>
              <span className="bg-sky-100 text-[#0369a1] border border-sky-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Beta-Titanium 6.8g Siêu Nhẹ
              </span>
            </div>

            {/* Wishlist & Share Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full border shadow-xs transition ${
                  isFavorite ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-slate-500 hover:text-red-500 border-slate-200'
                }`}
                aria-label="Yêu thích"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => alert('Đã sao chép liên kết sản phẩm vào bộ nhớ tạm!')}
                className="p-2 bg-white text-slate-500 hover:text-[#074768] rounded-full border border-slate-200 shadow-xs transition"
                aria-label="Chia sẻ"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Chính diện 0°', idx: 0 },
              { label: 'Góc nghiêng 45°', idx: 1 },
              { label: 'Bản lề & Đệm mũi', idx: 2 },
              { label: 'Trên mặt mẫu', idx: 3 },
            ].map((thumb) => (
              <button
                key={thumb.idx}
                type="button"
                onClick={() => setActiveImageIndex(thumb.idx)}
                className={`p-1 rounded-2xl border transition overflow-hidden text-center flex flex-col items-center ${
                  activeImageIndex === thumb.idx
                    ? 'border-[#074768] ring-2 ring-[#074768]/20 bg-sky-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-full h-16 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={images[thumb.idx]}
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-semibold mt-1 truncate">
                  {thumb.label}
                </span>
              </button>
            ))}
          </div>

          {/* 2 Utility Action Cards (Ảnh 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Card 1: Virtual Try-On */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#074768] text-white flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5 text-sky-200" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-xs text-slate-900">Gương Thử Kính Trực Tuyến</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Thử trực tiếp với camera / Virtual Try-On 3D.
                </p>
                <button
                  onClick={() => alert('Đang kích hoạt camera quét khuôn mặt 3D Virtual Try-On...')}
                  className="text-[11px] font-bold text-[#074768] hover:text-[#0284c7] mt-1 inline-flex items-center gap-1"
                >
                  <span>Bật Virtual Try-On 3D</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 2: Showroom Available */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-xs text-slate-900">Có Sẵn Tại 16 Showroom</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Trải nghiệm gọng thực tế và đo mắt 0đ.
                </p>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="text-[11px] font-bold text-[#074768] hover:text-[#0284c7] mt-1 inline-flex items-center gap-1"
                >
                  <span>Tìm cơ sở gần bạn nhất</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Specs & Lắp Tròng Chuẩn Y Khoa (Ảnh 4 & 5) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-[#0284c7] tracking-wider">
                BOLON EYEWEAR • PARIS
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                MÃ SKU: BJ3120-B10
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
              Kính Gọng Cận Nữ Titanium Bolon Graceful BJ3120 – Rose Gold Edition
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9</span>
                <span className="text-slate-400 font-normal">(170 đánh giá thực tế)</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Đã bán 542 sản phẩm</span>
            </div>
          </div>

          {/* Pricing box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-[#074768]">
              {formatPrice(finalPrice)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded-md">
              Tiết kiệm 16%
            </span>
          </div>

          {/* Color selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Màu sắc khung kính:
            </label>
            <div className="flex items-center gap-2">
              {[
                { id: 'ROSE_GOLD', label: 'Rose Gold (Hồng Vàng Tinh Tế)', color: '#fbcfe8' },
                { id: 'SILVER', label: 'Matte Silver', color: '#cbd5e1' },
                { id: 'CHAMPAGNE', label: 'Champagne', color: '#fef08a' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColor(c.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
                    selectedColor === c.id
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span style={{ backgroundColor: c.color }} className="w-3 h-3 rounded-full border border-slate-300"></span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizing (LENS - BRIDGE - TEMPLE) */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                KÍCH THƯỚC CHUẨN (LENS - BRIDGE - TEMPLE):
              </span>
              <button
                onClick={() => alert('Kích thước 51-18-145mm phù hợp cho khuôn mặt vừa và nhỏ, tôn dáng cằm thon gọn.')}
                className="text-[11px] font-bold text-[#0284c7] hover:underline"
              >
                Hướng dẫn đo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Đường kính tròng</span>
                <strong className="text-slate-800">51 mm</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Cầu mũi</span>
                <strong className="text-slate-800">18 mm</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Càng kính</span>
                <strong className="text-slate-800">145 mm</strong>
              </div>
            </div>
          </div>

          {/* CRITICAL BOX: CẤU HÌNH LẮP TRÒNG KÍNH (CHUẨN Y KHOA - Ảnh 4 & 5) */}
          <div className="bg-white rounded-3xl border-2 border-sky-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">
                  Cấu Hình Lắp Tròng Kính
                </h3>
              </div>
              <span className="bg-sky-100 text-[#0369a1] text-[10px] font-bold px-2 py-0.5 rounded-full">
                CHUẨN Y KHOA
              </span>
            </div>

            {/* Mode Tabs: Frame Only vs With Lens */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setLensMode('FRAME_ONLY')}
                className={`py-2 rounded-lg transition ${
                  lensMode === 'FRAME_ONLY'
                    ? 'bg-white text-[#074768] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chỉ Mua Gọng Kính
              </button>
              <button
                type="button"
                onClick={() => setLensMode('WITH_LENS')}
                className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  lensMode === 'WITH_LENS'
                    ? 'bg-[#074768] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👁️ Lắp Tròng Theo Đơn</span>
              </button>
            </div>

            {/* When "WITH_LENS" is selected */}
            {lensMode === 'WITH_LENS' && (
              <div className="space-y-4 pt-1">
                {/* 1. Chọn nguồn thông số */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-2">
                    1. Chọn nguồn thông số độ khúc xạ:
                  </span>
                  <div className="space-y-2 text-xs">
                    {/* Option 1: Latest Profile */}
                    <div
                      onClick={() => setRxSource('LATEST_PROFILE')}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        rxSource === 'LATEST_PROFILE'
                          ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="radio" checked={rxSource === 'LATEST_PROFILE'} readOnly className="text-[#074768]" />
                          <span className="font-bold">Hồ sơ thị lực gần nhất (Khám 18/10/2026)</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          Khuyên dùng
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 mt-1 pl-5">
                        Mắt Phải (OD): -2.25 D | Mắt Trái (OS): -1.75 D
                      </div>
                    </div>

                    {/* Option 2: Upload RX */}
                    <div
                      onClick={() => setRxSource('UPLOAD_RX')}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        rxSource === 'UPLOAD_RX'
                          ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={rxSource === 'UPLOAD_RX'} readOnly className="text-[#074768]" />
                        <span className="font-bold">Tải lên đơn thuốc bác sĩ / ảnh chụp toa cũ</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 pl-5">
                        Kỹ thuật viên phòng khám sẽ gọi lại xác nhận số đo.
                      </p>
                    </div>

                    {/* Option 3: Store Exam */}
                    <div
                      onClick={() => setRxSource('STORE_EXAM')}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        rxSource === 'STORE_EXAM'
                          ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={rxSource === 'STORE_EXAM'} readOnly className="text-[#074768]" />
                        <span className="font-bold">Đo mắt miễn phí tại Showroom khi nhận kính</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 pl-5">
                        Giữ gọng tại phòng lab, đến kiểm tra mắt và lắp kính lấy ngay.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Chọn gói tròng kính đề xuất */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-2">
                    2. Chọn gói tròng kính chính hãng đề xuất:
                  </span>
                  <div className="space-y-2 text-xs">
                    {/* Tròng Essilor Crizal */}
                    <div
                      onClick={() => setSelectedLensPackage('ESSILOR_167')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        selectedLensPackage === 'ESSILOR_167'
                          ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="radio" checked={selectedLensPackage === 'ESSILOR_167'} readOnly className="text-[#074768]" />
                          <span className="font-bold">Essilor Crizal Sapphire HR 1.67 (Pháp)</span>
                        </div>
                        <span className="font-black text-xs text-[#074768]">+ 1.450.000 đ</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed font-normal">
                        Siêu mỏng chiết suất 1.67 (giảm 35% độ dày), lớp phủ trong suốt 360° chống chói quang học, bảo vệ UV hai mặt & hạn chế trầy xước gấp 3 lần.
                      </p>
                    </div>

                    {/* Tròng Chemi U2 */}
                    <div
                      onClick={() => setSelectedLensPackage('CHEMI_160')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        selectedLensPackage === 'CHEMI_160'
                          ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="radio" checked={selectedLensPackage === 'CHEMI_160'} readOnly className="text-[#074768]" />
                          <span className="font-bold">Chemi U2 Chống Ánh Sáng Xanh 1.60 (Hàn Quốc)</span>
                        </div>
                        <span className="font-black text-xs text-[#074768]">+ 650.000 đ</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed font-normal">
                        Ngăn 99% ánh sáng xanh từ màn hình máy tính, lớp phủ Crystal U2 chống bám hơi nước và bụi bẩn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA Buttons */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="bg-white border-2 border-[#074768] hover:bg-slate-50 text-[#074768] py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>🛒 Thêm Vào Giỏ Hàng</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="bg-[#074768] hover:bg-[#09577f] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-[#074768]/25 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>⚡ Mua Ngay & Nhận Kính</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Lắp ráp tại phòng lab vô trùng, đóng gói test tiêu chuẩn trong vòng 20 phút.
            </p>
          </div>

          {/* 4 Guarantees */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#074768]" />
              <span>100% Chính hãng phân phối</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#074768]" />
              <span>Bảo hiểm thị lực 180 ngày</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#074768]" />
              <span>Miễn phí giao toàn quốc</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#074768]" />
              <span>Bảo hành kỹ thuật 365 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Specification Details Tabs (Ảnh 4 & 5) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'SPECS', label: 'Thông Số Kỹ Thuật & Vật Liệu' },
            { id: 'WARRANTY', label: 'Chính Sách Bảo Hành & Đổi Trả' },
            { id: 'CARE', label: 'Hướng Dẫn Đo Mắt & Bảo Quản' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSpecTab(tab.id)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 mr-6 transition ${
                activeSpecTab === tab.id
                  ? 'border-[#074768] text-[#074768]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeSpecTab === 'SPECS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table */}
            <div className="lg:col-span-7 space-y-3">
              <span className="font-extrabold text-xs text-slate-900 block uppercase tracking-wider">
                ĐẶC TÍNH KHUNG GỌNG & VẬT LIỆU
              </span>
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                {[
                  { k: 'Thương hiệu', v: 'Bolon Eyewear (Thiết kế tại Paris)' },
                  { k: 'Chất liệu khung viền', v: 'Beta-Titanium Nhật Bản nguyên khối' },
                  { k: 'Trọng lượng khung', v: '6.8 grams (Siêu nhẹ không tì vết)' },
                  { k: 'Đệm ve mũi', v: 'Silicon y tế kháng khuẩn, tự cân chỉnh sống mũi' },
                  { k: 'Công nghệ mạ bề mặt', v: 'Ion Mạ Chân Không PVD 3 lớp chống phai' },
                  { k: 'Kiểu dáng thiết kế', v: 'Mắt mèo vát cạnh thanh lịch (Graceful Cat-Eye)' },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 p-3 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                  >
                    <div className="col-span-5 font-semibold text-slate-500">{row.k}</div>
                    <div className="col-span-7 font-bold text-slate-900">{row.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aerospace Titan Showcase Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#063c59] to-[#09547d] text-white p-6 rounded-2xl space-y-4">
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
                TRIẾT LÝ CHẾ TÁC CAO CẤP
              </span>
              <h4 className="text-base font-black">
                Beta-Titanium Hàng Không: Độ Đàn Hồi Vượt Trội
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                Khác biệt hoàn toàn so với kim loại thông thường, hợp kim Beta-Titanium trên Bolon BJ3120 mang lại khả năng uốn cong linh hoạt, tự phục hồi form dáng sau va đập nhẹ. Hạn chế kích ứng da vùng thái dương ngay cả khi đeo liên tục 14 tiếng mỗi ngày.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 bg-white/10 rounded-xl">
                  <div className="font-black text-sky-300 text-sm">100%</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Chống gỉ sét mồ hôi</div>
                </div>
                <div className="p-2 bg-white/10 rounded-xl">
                  <div className="font-black text-sky-300 text-sm">0.6mm</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Độ mảnh càng kính</div>
                </div>
                <div className="p-2 bg-white/10 rounded-xl">
                  <div className="font-black text-sky-300 text-sm">ISO</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Chứng nhận y tế CE/FDA</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Sản Phẩm Phối Hợp & Gợi Ý Tương Tự (Ảnh 4 & 5) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              CÙNG BỘ SƯU TẬP TIÊU BIỂU
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Sản Phẩm Phối Hợp & Gợi Ý Tương Tự
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1"
          >
            <span>Xem tất cả gọng Titanium</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 11,
              name: 'Gọng Kính Charmant Excellence',
              brand: 'CHARMANT LINE ART',
              price: 6950000,
              tag: 'Japan Made',
              image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 12,
              name: 'Ray-Ban Round Metal Optical',
              brand: 'RAY-BAN GENUINE',
              price: 4250000,
              tag: 'Bán chạy #1',
              image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 13,
              name: 'Bolon Titanium Asteria BJ3085',
              brand: 'BOLON EYEWEAR',
              price: 3980000,
              tag: 'Mẫu Mới',
              image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 14,
              name: 'Khăn Lau Nano Chống Bám Hơi Nước',
              brand: 'OPTI-VISION LAB',
              price: 150000,
              tag: 'Phụ kiện kèm',
              image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
            },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 sm:h-40 w-full rounded-xl bg-slate-50 overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#074768] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase block">{item.brand}</span>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{item.name}</h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-[#074768]">{formatPrice(item.price)}</span>
                <button
                  onClick={() => alert(`Đã xem chi tiết ${item.name}`)}
                  className="text-xs font-bold text-[#074768] hover:underline"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

