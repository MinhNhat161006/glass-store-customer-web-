import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Clock, Award, Eye, Calendar, Sparkles, 
  MapPin, CheckCircle2, ChevronRight, Search, FileText, RefreshCw, Star 
} from 'lucide-react';

export default function HomePage({ setActiveTab, openBooking, openAuth, onAddToCart, onViewDetail }) {
  const [selectedBestSellerTab, setSelectedBestSellerTab] = useState('ALL');

  const categories = [
    {
      id: 'frame',
      title: 'Gọng Kính Cao Cấp',
      desc: 'Khung titan, acetate thủ công nhập khẩu từ Nhật & Ý.',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'lens',
      title: 'Tròng Kính Kỹ Thuật Số',
      desc: 'Lọc 99% ánh sáng xanh, đổi màu mỏng nhẹ chuẩn khúc xạ.',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'sun',
      title: 'Kính Râm Thời Trang',
      desc: 'Chống 100% tia UV, tròng phân cực polarized lái xe an toàn.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'accessory',
      title: 'Phụ Kiện Chuyên Dụng',
      desc: 'Hộp da khâu tay, khăn lau nano chống bám hơi nước cao cấp.',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const bestSellers = [
    {
      id: 1,
      brand: 'Ray-Ban',
      name: 'Clubmaster Classic RB3016',
      sku: 'RB3016-W0365',
      price: 4250000,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80',
      tag: 'Bán chạy',
    },
    {
      id: 2,
      brand: 'BOLON PARIS',
      name: 'Bolon Smart BJ60520 Titanium',
      sku: 'BOLON-BJ60520',
      price: 3850000,
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
      tag: 'Titanium',
    },
    {
      id: 3,
      brand: 'CHARMANT LINE ART',
      name: 'Charmant Excellence CH2110',
      sku: 'CHRM-CH2110',
      price: 7350000,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
      tag: 'Cao cấp',
    },
    {
      id: 4,
      brand: 'ESSILOR FRANCE',
      name: 'Crizal® Sapphire™ HR 1.67',
      sku: 'LNS-ESSI-167',
      price: 2950000,
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
      tag: 'Tròng số 1',
    },
  ];

  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner (Ảnh 2) */}
      <section className="relative bg-gradient-to-r from-[#04283c] via-[#063c59] to-[#09547d] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow & geometry */}
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] rounded-full bg-[#38bdf8]/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#97d7ff]/10 blur-2xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Thấu thị tinh hoa, <br />
              <span className="text-[#38bdf8]">Định hình phong cách.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Giải pháp mắt kính đo khúc xạ chuẩn y khoa kết hợp công nghệ mài lắp tự động Đức, chuỗi quốc tế hàng đầu khu vực mang lại trải nghiệm thị lực đỉnh cao.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('products')}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#0284c7]/30 flex items-center gap-2 transition active:scale-95"
              >
                <span>Khám Phá Bộ Sưu Tập</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openBooking}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-3 rounded-xl font-semibold text-sm backdrop-blur-sm transition flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#38bdf8]" />
                <span>Đặt Lịch Đo Khám Tại Showroom</span>
              </button>
            </div>

            {/* 3 Trust Badges */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                <span>16+ Showroom toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#38bdf8]" />
                <span>100% Tròng chính hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38bdf8]" />
                <span>Bảo hành 365 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Optical Solutions (Giải Pháp Chăm Sóc Thị Giác Tuyển Lựa - Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7]">
              DANH MỤC TUYỂN CHỌN
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Giải Pháp Chăm Sóc Thị Giác Tuyển Lựa
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1 transition"
          >
            <span>Xem tất cả danh mục</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveTab('products')}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0284c7] transition duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#074768] transition">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Section (Gọng Kính & Tròng Bán Chạy Nhất - Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7]">
              NỔI BẬT NHẤT THÁNG NÀY
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Gọng Kính & Tròng Bán Chạy Nhất
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
            {[
              { id: 'ALL', label: 'Tất cả' },
              { id: 'BEST', label: 'Bán chạy' },
              { id: 'TITAN', label: 'Gọng Titanium' },
              { id: 'FASHION', label: 'Kính cận thời trang' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedBestSellerTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  selectedBestSellerTab === tab.id
                    ? 'bg-[#074768] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="relative h-36 sm:h-40 bg-slate-50 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute top-5 left-5 bg-white/95 text-[#074768] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                  {item.tag}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#0284c7] tracking-wider">
                    {item.brand}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-black text-[#074768]">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={() => onViewDetail ? onViewDetail(item) : onAddToCart(item)}
                    className="bg-[#074768] hover:bg-[#09577f] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition active:scale-95"
                  >
                    Chi tiết →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Electronic Prescription Callout Banner (Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Bạn Đã Có Đơn Thị Lực Cũ Tại OptiVision?
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Tra cứu nhanh số đo SPH, CYL, AXIS và PD để đặt kính online ngay không cần đo lại.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={openAuth}
              className="flex-1 md:flex-initial bg-[#074768] hover:bg-[#09577f] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap"
            >
              Tra Cứu Đơn Thị Lực
            </button>
            <button
              onClick={() => alert('Đang kết nối chuyên viên khúc xạ tư vấn trực tuyến...')}
              className="flex-1 md:flex-initial bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap"
            >
              Tư Vấn Trực Tuyến
            </button>
          </div>
        </div>
      </section>

      {/* 5. 3 Guided Customer Journeys (Lựa Chọn Sản Phẩm Phù Hợp - Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7]">
            QUY TRÌNH THÔNG MINH TẠI OPTIVISION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Lựa Chọn Sản Phẩm Phù Hợp Với Nhu Cầu
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Tìm kiếm kính mắt cá nhân hóa với hệ thống tiêu chuẩn quang học tối ưu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Chọn tròng */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#0284c7] transition space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">1. Chọn Tròng Kính</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Lựa chọn tròng kính bảo vệ mắt tối ưu (chống ánh sáng xanh, đổi màu mỏng nhẹ, chống chói lóa lái xe ban đêm).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1.5 pt-2"
            >
              <span>Chọn tròng kính</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Chọn gọng */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#0284c7] transition space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">2. Chọn Gọng Kính</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Lựa chọn gọng kính chuẩn tỉ lệ khuôn mặt (kim loại titan siêu nhẹ, nhựa nguyên khối Acetate, kính không viền).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1.5 pt-2"
            >
              <span>Chọn gọng kính</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Đặt lịch */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#0284c7] transition space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">3. Đặt Lịch Đo Khám</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Trải nghiệm quy trình đo thị lực chuẩn quốc tế 12 bước cùng chuyên viên nhãn khoa bằng máy đo khúc xạ tự động.
              </p>
            </div>
            <button
              onClick={openBooking}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1.5 pt-2"
            >
              <span>Đặt lịch ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Big Stat Box "Vì Sao Hơn 1.000.000 Khách Hàng Tin Chọn OptiVision?" (Ảnh 2) */}
      <section className="bg-[#053752] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#38bdf8]">
              UY TÍN KHẲNG ĐỊNH QUA THỜI GIAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Vì Sao Hơn 1.000.000 Khách Hàng Tin Chọn OptiVision?
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              Hành trình tạo dựng niềm tin nhờ tiêu chuẩn vàng nhãn khoa và sản phẩm quang học chuẩn xác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#08486b] p-8 rounded-2xl border border-sky-400/20">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8]">16+</div>
              <div className="text-sm font-bold mt-2">Chi Nhánh & Showroom</div>
              <p className="text-xs text-slate-300 mt-1">
                Hệ thống cơ sở hiện đại phủ rộng các thành phố lớn: Hà Nội, TP.HCM, Đà Nẵng.
              </p>
            </div>

            <div className="bg-[#08486b] p-8 rounded-2xl border border-sky-400/20">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8]">13+</div>
              <div className="text-sm font-bold mt-2">Năm Khẳng Định Uy Tín</div>
              <p className="text-xs text-slate-300 mt-1">
                Tiên phong chuẩn hóa quy trình đo khám nhãn khoa và phân phối kính mắt chính hãng.
              </p>
            </div>

            <div className="bg-[#08486b] p-8 rounded-2xl border border-sky-400/20">
              <div className="text-3xl sm:text-4xl font-black text-[#38bdf8]">1.000.000+</div>
              <div className="text-sm font-bold mt-2">Khách Hàng Tin Dùng</div>
              <p className="text-xs text-slate-300 mt-1">
                Nhận được sự tin tưởng tuyệt đối từ khách hàng cá nhân đến các đối tác doanh nghiệp lớn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 4 Reasons to choose OptiVision (Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7]">
            CAM KẾT TUYỆT ĐỐI
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Lý Do Nên Chọn Kính Mắt Tại OptiVision
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Sự kết hợp hoàn hảo giữa công nghệ y khoa hiện đại và thời trang mắt kính cao cấp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#074768] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Sản Phẩm Chất Lượng Cao Cấp</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cam kết 100% sản phẩm chính hãng có tem chống hàng giả từ Bộ Công An và thẻ bảo hành quốc tế.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#074768] text-white flex items-center justify-center">
              <Eye className="w-4 h-4 text-sky-300" />
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Dịch Vụ Chuẩn Y Khoa</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Quy trình đo khúc xạ 12 bước chuẩn quốc tế với hệ thống máy móc tự động và kỹ thuật viên tay nghề cao.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#074768] text-white flex items-center justify-center">
              <Clock className="w-4 h-4 text-sky-300" />
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Trực Quan & Tự Do Đo</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Trải nghiệm soi kính và thử tròng với thiết bị đo thị lực kỹ thuật số hiện đại nhất hiện nay.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#074768] text-white flex items-center justify-center">
              <Award className="w-4 h-4 text-sky-300" />
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Đổi Mới Nhanh & Hoàn Tiền</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Bảo hành 1 đổi 1 trong 30 ngày nếu không êm mắt và hoàn tiền minh bạch nếu có lỗi quang học.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Showroom Locator & Map (Tìm Cơ Sở OptiVision Gần Nhất - Ảnh 2) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
          <div className="mb-6">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#0284c7]">
              HỆ THỐNG SHOWROOM TOÀN QUỐC
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Tìm Cơ Sở OptiVision Gần Nhất
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Tất cả các chi nhánh đều có trang thiết bị đo khúc xạ tiêu chuẩn cao và kỹ thuật viên chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Showroom list */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Nhập tỉnh thành, quận huyện..."
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#074768]"
                />
              </div>

              {[
                { name: 'Flagship Quận 1 (TP.HCM)', address: '88 Lê Thánh Tôn, Bến Nghé, Quận 1', phone: '028 3822 6868' },
                { name: 'Chi nhánh Hoàn Kiếm (Hà Nội)', address: '24 Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '024 3936 6868' },
                { name: 'Chi nhánh Hải Châu (Đà Nẵng)', address: '102 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', phone: '0236 388 6868' },
              ].map((loc, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between hover:border-[#0284c7] transition">
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{loc.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{loc.address}</p>
                    <p className="text-[10px] text-[#0284c7] font-semibold mt-0.5">📞 {loc.phone}</p>
                  </div>
                  <button
                    onClick={() => alert(`Đang mở bản đồ dẫn đường tới ${loc.name}`)}
                    className="text-[11px] font-bold text-[#074768] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg shrink-0 transition"
                  >
                    Chỉ đường
                  </button>
                </div>
              ))}
            </div>

            {/* Map visual preview */}
            <div className="lg:col-span-7 h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-200 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="Bản đồ mạng lưới chi nhánh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#074768]/20 flex items-center justify-center p-4">
                <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">16 Chi Nhánh Khúc Xạ Tiêu Chuẩn</div>
                    <div className="text-[10px] text-slate-500">Mở cửa: 08:30 - 21:30 hàng ngày</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

