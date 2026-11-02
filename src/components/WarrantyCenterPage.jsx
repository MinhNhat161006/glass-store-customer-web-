import React, { useState } from 'react';
import { 
  ShieldCheck, Search, Wrench, Download, Eye, Clock, 
  MapPin, Check, ArrowRight, AlertCircle, Phone, Sparkles, Award 
} from 'lucide-react';

export default function WarrantyCenterPage({ setActiveTab }) {
  const [searchCode, setSearchCode] = useState('0918 842 592');
  const [selectedProduct, setSelectedProduct] = useState('WAR-OPTI-9842');
  const [selectedService, setSelectedService] = useState('ALIGN');
  const [deliveryMethod, setDeliveryMethod] = useState('SHOWROOM');
  const [notes, setNotes] = useState('Kính bị lỏng ốc càng bên phải, xin nắn lại form ôm sát sống mũi...');

  const handleSearchWarranty = (e) => {
    e.preventDefault();
    alert(`Đã tìm thấy 02 thẻ bảo hành kỹ thuật số liên kết với dữ liệu [${searchCode}]!`);
  };

  const handleSubmitWarrantyRequest = (e) => {
    e.preventDefault();
    alert(`🎉 YÊU CẦU BẢO HÀNH ĐÃ ĐƯỢC TIẾP NHẬN!\n\nMã phiếu kỹ thuật: HSKT-2026-${Math.floor(1000 + Math.random() * 9000)}\nSản phẩm: Titanium Slimline Gold Edition\nDịch vụ: Nắn chỉnh form & Vệ sinh sóng siêu âm\nShowroom tiếp nhận: Flagship 88 Lê Thánh Tôn, Quận 1\n\nKỹ thuật viên sẽ kiểm tra và thông báo khi hoàn thành.`);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header & Search Banner (Ảnh 2 & 3 chuẩn xác) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-[#0369a1] border border-sky-200 mb-2">
              Hệ thống bảo hành quang học kỹ thuật số [e-Warranty HK-GIAI / 06-25]
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trung Tâm Bảo Hành & Hậu Mãi Khúc Xạ
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Tra cứu thông số kỹ thuật quang học, thời hạn bảo hành điện tử chính hãng và kích hoạt các đặc quyền chăm sóc thị lực trọn đời tại toàn bộ hệ sinh thái showroom OptiVision.
            </p>
          </div>

          {/* 3 Quick summary indicators */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block font-semibold">Sản phẩm kích hoạt</span>
              <span className="text-lg font-black text-slate-900">02</span>
              <span className="text-[10px] text-emerald-600 font-bold block">Đang bảo hành</span>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block font-semibold">Phiếu hỗ trợ kỹ thuật</span>
              <span className="text-lg font-black text-slate-900">01</span>
              <span className="text-[10px] text-sky-600 font-bold block">Đang tiến hành</span>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block font-semibold">Đặc quyền quang học</span>
              <span className="text-lg font-black text-[#074768]">Trọn đời</span>
              <span className="text-[10px] text-slate-500 block">Căn chỉnh & Vệ sinh</span>
            </div>
          </div>
        </div>

        {/* Search input group */}
        <div>
          <form onSubmit={handleSearchWarranty} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Nhập số điện thoại mua hàng hoặc mã thẻ bảo hành (VD: WAR-OPTI-9842)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 font-medium outline-none focus:border-[#074768] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-[#074768] hover:bg-[#09577f] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-sm shrink-0 active:scale-95"
            >
              Tra Cứu Ngay
            </button>
          </form>

          {/* Search suggestions tags */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
            <span>Gợi ý tra cứu:</span>
            {['WAR-OPTI-9842', 'WAR-CRI-5510', 'WORD-2026-9062'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchCode(tag)}
                className="font-mono text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SẢN PHẨM ĐANG ĐƯỢC BẢO HỘ (Ảnh 2 & 3) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              THẺ BẢO HÀNH KỸ THUẬT SỐ
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              Sản Phẩm Đang Được Bảo Hộ
            </h2>
          </div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Dữ liệu đồng bộ với hệ thống bệnh viện & POS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Gọng kính Titanium Slimline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-sky-50 text-[#0369a1] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-sky-200">
                  Gọng Kính Chính Hãng • #WAR-OPTI-9842
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Hiệu lực 365 ngày
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Titanium Slimline Gold Edition
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hợp kim Titanium siêu nhẹ phủ mạ PVD Vàng Champagne cao cấp.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Kích hoạt:</span>
                  <strong>15/10/2026</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Hết hạn:</span>
                  <strong>15/10/2027</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mã đơn hàng:</span>
                  <strong className="font-mono">ORD-2026-9842</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Bảo hành kết cấu:</span>
                  <strong className="text-emerald-700">12 tháng</strong>
                </div>
              </div>

              {/* Special benefits */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <span className="font-bold text-[11px] text-slate-800 block">QUYỀN LỢI ĐỘC QUYỀN ĐI KÈM:</span>
                <div className="flex items-start gap-1.5 text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Miễn phí căn chỉnh form gọng và cân chỉnh tâm quang học trọn đời</span>
                </div>
                <div className="flex items-start gap-1.5 text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Miễn phí thay thế đệm mũi silicon y tế và ốc gọng định kỳ 6 tháng/lần</span>
                </div>
                <div className="flex items-start gap-1.5 text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Đổi mới 1 đổi 1 trong 30 ngày nếu có lỗi kỹ thuật từ nhà sản xuất</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => alert('Đang tải thẻ bảo hành điện tử PDF...')}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Thẻ PDF</span>
              </button>
              <button
                onClick={() => alert('Đã mở form yêu cầu sửa chữa cho gọng Titanium Slimline')}
                className="flex-1 bg-[#074768] hover:bg-[#09577f] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Yêu Cầu Sửa Chữa</span>
              </button>
            </div>
          </div>

          {/* Card 2: Tròng kính Crizal Prevencia */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-sky-50 text-[#0369a1] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-sky-200">
                  Tròng Kính Kỹ Thuật Số • #WAR-CRI-5510
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Hiệu lực 310 ngày
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Crizal Prevencia 1.67 Aspheric
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lọc ánh sáng xanh chọn lọc • Chống phản quang UV400 • Chống trầy xước chuẩn Pháp.
                </p>
              </div>

              {/* Linked Prescription Specs */}
              <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-2">
                <span className="text-[10px] font-bold text-[#0369a1] uppercase block">
                  THÔNG SỐ KHÚC XẠ LIÊN KẾT:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-400 block">MẮT PHẢI (OD):</span>
                    <strong className="font-mono text-slate-900">SPH: -2.50D | CYL: -0.50D (175°)</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-slate-400 block">MẮT TRÁI (OS):</span>
                    <strong className="font-mono text-slate-900">SPH: -2.75D | CYL: -0.75D (180°)</strong>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">
                  ✓ Bảo hiểm đổi độ khúc xạ 6 tháng: Miễn phí đổi số độ mới nếu tăng độ đến 15/04/2027.
                </div>
              </div>

              {/* Special benefits */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <span className="font-bold text-[11px] text-slate-800 block">CAM KẾT BẢO HÀNH LỚP VÁNG CRIZAL:</span>
                <div className="flex items-start gap-1.5 text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bảo hành bong tróc lớp váng phủ từ tính trong vòng 12 tháng</span>
                </div>
                <div className="flex items-start gap-1.5 text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hỗ trợ 50% chi phí đổi tròng mới nếu trầy xước không thể khắc phục</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => alert('Đang tải thẻ bảo hành tròng kính PDF...')}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Thẻ PDF</span>
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className="flex-1 bg-[#074768] hover:bg-[#09577f] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Đo Độ Khúc Xạ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tiến Trình Phiếu Hỗ Trợ Kỹ Thuật Đang Thực Hiện (Ảnh 2 & 3) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sky-50 text-[#0369a1] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Mã số: HSKT-2026-0312
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Đang xử lý tại Lab kỹ thuật
              </span>
            </div>
            <h3 className="font-black text-base text-slate-900 mt-1">
              Tiến Trình Phiếu Hỗ Trợ Kỹ Thuật Đang Thực Hiện
            </h3>
          </div>

          <div className="text-xs text-slate-500">
            KTV Phụ trách: <strong>Nguyễn Văn Khoa</strong> (Kỹ sư quang học Lab Q.1)
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-slate-400 block text-[10px]">Hạng mục dịch vụ:</span>
            <strong className="text-slate-900">Nắn chỉnh form gọng & Vệ sinh sóng siêu âm</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Showroom phụ trách:</span>
            <strong className="text-slate-900">Flagship 88 Lê Thánh Tôn, Bến Nghé, Quận 1</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Thời gian hẹn trả:</span>
            <strong className="text-[#074768]">Hôm nay, 16:30 (18/10/2026)</strong>
          </div>
        </div>

        {/* Progress Stepper 3 Steps */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs py-4">
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 text-[11px]">1. Tiếp nhận kính</span>
            <span className="text-[10px] text-slate-400">09:15 - Showroom Q.1 tiếp nhận</span>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#074768] text-white flex items-center justify-center animate-pulse shadow-md">
              <Wrench className="w-4 h-4 text-sky-200" />
            </div>
            <span className="font-bold text-[#074768] text-[11px]">2. Kỹ thuật xử lý</span>
            <span className="text-[10px] text-sky-600 font-semibold">Ước tính còn khoảng 1h15m</span>
          </div>

          <div className="flex flex-col items-center space-y-1.5 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-500 text-[11px]">3. Sẵn sàng bàn giao</span>
            <span className="text-[10px] text-slate-400">Dự kiến 16:30 tại quầy lễ tân</span>
          </div>
        </div>
      </section>

      {/* 4. Form Đăng Ký Bảo Dưỡng & Sửa Chữa Trực Tuyến + Cột Quy Chuẩn (Ảnh 2 & 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              DỊCH VỤ HẬU MÃI NHANH
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Đăng Ký Bảo Dưỡng & Sửa Chữa Trực Tuyến
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Chuyên viên quang học OptiVision sẽ kiểm tra lịch sử khúc xạ và chuẩn bị trang thiết bị chuyên dụng trước khi quý khách đến showroom hoặc cử kỹ thuật viên tiếp nhận.
            </p>
          </div>

          <form onSubmit={handleSubmitWarrantyRequest} className="space-y-5">
            {/* Bước 1: Chọn sản phẩm */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Bước 1: Chọn sản phẩm cần bảo hành / chăm sóc:
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#074768]"
              >
                <option value="WAR-OPTI-9842">Gọng Titanium Slimline Gold Edition (Mã thẻ: WAR-OPTI-9842)</option>
                <option value="WAR-CRI-5510">Tròng Crizal Prevencia 1.67 Aspheric (Mã thẻ: WAR-CRI-5510)</option>
                <option value="OTHER">Sản phẩm kính khác chưa đăng ký bảo hành</option>
              </select>
            </div>

            {/* Bước 2: Chọn dịch vụ */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Bước 2: Chọn dịch vụ hậu mãi mong muốn:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'ALIGN', title: 'Nắn chỉnh form gọng kính', desc: 'Lệch tai, lỏng chật, tuột mũi' },
                  { id: 'CLEAN', title: 'Vệ sinh sóng siêu âm & Thay ve', desc: 'Tẩy ố ve mũi silicon, thay ốc vít' },
                  { id: 'RX_INSURANCE', title: 'Bảo hiểm độ độ khúc xạ (6T)', desc: 'Mờ mắt, khó nhìn sau 30 ngày' },
                  { id: 'COATING', title: 'Bảo hành váng phủ tròng kính', desc: 'Kiểm tra trầy xước, lớp lọc ánh sáng' },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      selectedService === s.id
                        ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={selectedService === s.id} readOnly className="text-[#074768]" />
                      <span className="font-bold">{s.title}</span>
                    </div>
                    <p className="text-[11px] font-normal text-slate-400 mt-1 pl-5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bước 3: Phương thức bàn giao */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Bước 3: Phương thức bàn giao & Xử lý:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setDeliveryMethod('SHOWROOM')}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === 'SHOWROOM'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={deliveryMethod === 'SHOWROOM'} readOnly className="text-[#074768]" />
                    <span className="font-bold">Mang đến Showroom gần nhất</span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-400 mt-1 pl-5">
                    Được ưu tiên xử lý lấy ngay trong 15 - 20 phút.
                  </p>
                </div>

                <div
                  onClick={() => setDeliveryMethod('DOOR')}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === 'DOOR'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={deliveryMethod === 'DOOR'} readOnly className="text-[#074768]" />
                    <span className="font-bold">Đưa đón tận nhà 2 chiều</span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-400 mt-1 pl-5">
                    OptiVision cử bưu tá bảo hiểm tiếp nhận tận nơi trên toàn quốc.
                  </p>
                </div>
              </div>
            </div>

            {/* Ghi chú chi tiết */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ghi chú tình trạng chi tiết (tùy chọn):
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#074768] focus:bg-white"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Được bảo đảm bởi tiêu chuẩn lâm sàng OptiVision
              </span>
              <button
                type="submit"
                className="bg-[#074768] hover:bg-[#09577f] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-sm active:scale-95"
              >
                Gửi Yêu Cầu Hậu Mãi
              </button>
            </div>
          </form>
        </div>

        {/* Right: Cam Kết & Hotline (Ảnh 2 & 3) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              CAM KẾT ĐẶC QUYỀN
            </span>
            <h4 className="text-sm font-black text-slate-900">Quy Chuẩn Chăm Sóc OptiVision</h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Bảo Hiểm Khúc Xạ 6 Tháng</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Đặc quyền miễn phí 100% đổi thông số độ tròng kính mới trong 180 ngày nếu độ khúc xạ của bạn bị thay đổi hoặc chưa thích nghi tốt với độ cận/loạn mới.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Vệ Sinh & Bảo Dưỡng Trọn Đời</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Miễn phí căn chỉnh độ cân bằng, thay đệm mũi y tế, thay ốc vít và làm sạch sâu bằng sóng siêu âm tại bất kỳ showroom nào của OptiVision trên toàn quốc.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Bảo Hành Lớp Phủ Chính Hãng</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Bảo hành váng phủ quang học chính hãng trong 12 tháng: bong tróc, trầy xước nhẹ do lỗi kỹ thuật của nhà sản xuất tròng kính.
                  </p>
                </div>
              </div>
            </div>

            {/* Hotline Emergency Box */}
            <div className="p-4 rounded-2xl bg-[#063c59] text-white space-y-2 mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-300" /> Cần trợ giúp quang học khẩn?
              </span>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                Kỹ thuật viên phòng khám luôn sẵn sàng hỗ trợ kiểm tra gọng gãy vỡ hay mỏi nhức mắt.
              </p>
              <div className="text-lg font-black text-white pt-1">
                Hotline: 1900 6868
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

