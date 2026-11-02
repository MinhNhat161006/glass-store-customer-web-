import React, { useState } from 'react';
import {
  FileText, Download, ShoppingBag, ShieldCheck, Clock,
  Calendar, Award, Copy, Check, ChevronRight, AlertCircle, Wrench
} from 'lucide-react';

export default function VisionRecordPage({ setActiveTab, onAddToCart }) {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOrderFromRx = () => {
    alert('Đã nạp số đo độ khúc xạ OD/OS vào cấu hình đơn hàng! Đang chuyển đến trang chọn gọng kính...');
    setActiveTab('products');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header greeting & quick actions (Ảnh 1 chuẩn xác) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Hạng VIP Silver • Mã #VIP-59240</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Chào mừng trở lại, Trần Hoàng Nam
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cổng thông tin thị lực cá nhân & theo dõi chế tác kính.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('booking')}
            className="bg-[#074768] hover:bg-[#09577f] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Calendar className="w-4 h-4 text-sky-300" />
            <span>Đặt lịch khám</span>
          </button>
          <button
            onClick={() => alert('Đang tải danh sách các đơn hàng đã đặt...')}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition"
          >
            <FileText className="w-4 h-4 text-[#074768]" />
            <span>Đơn hàng</span>
          </button>
        </div>
      </div>

      {/* 2. Top 3 Quick Stats Widgets (Ảnh 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Đơn chờ nhận */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Đơn chờ nhận</span>
              <span className="text-lg font-black text-slate-900">01 đơn</span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-sky-100 text-[#0369a1] px-2.5 py-1 rounded-full">
            Đang mài lắp
          </span>
        </div>

        {/* Card 2: Hồ sơ thị lực */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Hồ sơ thị lực</span>
              <span className="text-sm font-black text-slate-900">18/10/2026</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Đo gần nhất
          </span>
        </div>

        {/* Card 3: Điểm OptiPoint */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Điểm OptiPoint</span>
              <span className="text-lg font-black text-slate-900">450 điểm</span>
            </div>
          </div>
          <button
            onClick={() => alert('Mở kho quà đổi điểm VIP Loyalty')}
            className="text-[11px] font-bold text-[#074768] hover:text-[#0284c7] transition"
          >
            Đổi quà →
          </button>
        </div>
      </div>

      {/* 3. Main 2-Columns Body (Ảnh 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Toa Kính Lâm Sàng & Tiến Trình Gia Công */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Toa Kính Lâm Sàng */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base text-slate-900">Toa Kính Lâm Sàng</h3>
                  <span className="bg-sky-50 text-[#0369a1] text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                    Chuẩn ISO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Toa #OPT-2026-8874 • BS. Nguyễn Văn A
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <div className="font-bold text-slate-700">18/10/2026</div>
                <div>CN Lê Thánh Tôn (Q.1)</div>
              </div>
            </div>

            {/* Electronic Rx Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="grid grid-cols-5 bg-slate-50 p-2.5 font-bold text-slate-600 text-center text-[10px] uppercase tracking-wider border-b border-slate-200">
                <div className="text-left pl-2">MẮT</div>
                <div>ĐỘ CẬN (SPH)</div>
                <div>ĐỘ LOẠN (CYL)</div>
                <div>TRỤC (AXIS)</div>
                <div>THỊ LỰC</div>
              </div>

              {/* Row OD */}
              <div className="grid grid-cols-5 p-3 text-center items-center border-b border-slate-100 font-semibold text-slate-800">
                <div className="text-left pl-2 font-bold text-[#074768]">OD Mắt Phải</div>
                <div className="font-mono text-sm">-2.25 D</div>
                <div className="font-mono text-sm">-0.75 D</div>
                <div className="font-mono text-sm text-[#0284c7]">175°</div>
                <div className="font-mono text-xs text-emerald-600 font-bold">10/10</div>
              </div>

              {/* Row OS */}
              <div className="grid grid-cols-5 p-3 text-center items-center font-semibold text-slate-800 bg-slate-50/50">
                <div className="text-left pl-2 font-bold text-[#074768]">OS Mắt Trái</div>
                <div className="font-mono text-sm">-2.00 D</div>
                <div className="font-mono text-sm">-0.50 D</div>
                <div className="font-mono text-sm text-[#0284c7]">180°</div>
                <div className="font-mono text-xs text-emerald-600 font-bold">10/10</div>
              </div>
            </div>

            {/* PD & SEG Info strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Khoảng cách đồng tử (PD):</span>
                <span className="font-bold text-slate-900 font-mono">63.5 mm</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Tâm kính (SEG):</span>
                <span className="font-bold text-slate-900 font-mono">18.0 mm</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => alert('Đang tải file PDF Toa Kính Lâm Sàng chuẩn nhãn khoa...')}
                className="w-full sm:w-auto flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Tải PDF toa kính</span>
              </button>

              <button
                onClick={handleOrderFromRx}
                className="w-full sm:w-auto flex-1 bg-[#074768] hover:bg-[#09577f] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-sky-300" />
                <span>Đặt kính từ toa này</span>
              </button>
            </div>
          </div>

          {/* Card: TIẾN TRÌNH GIA CÔNG (Ảnh 1) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                  TIẾN TRÌNH GIA CÔNG
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">
                  Kính Essilor Crizal #ORD-8924
                </h3>
              </div>
              <span className="font-black text-sm text-[#074768]">3.450.000 đ</span>
            </div>

            {/* Stepper 3 Steps */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-[11px]">1. Đã duyệt toa</div>
                <div className="text-[10px] text-slate-400">11:00 • 18/10</div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#074768] text-white flex items-center justify-center shadow-md animate-pulse">
                  <Wrench className="w-4 h-4 text-sky-200" />
                </div>
                <div className="font-bold text-[#074768] text-[11px]">2. Mài lắp Lab</div>
                <div className="text-[10px] text-sky-600 font-semibold">Đang thực hiện</div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-1.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-500 text-[11px]">3. Sẵn sàng nhận</div>
                <div className="text-[10px] text-slate-400">Dự kiến 17:30</div>
              </div>
            </div>

            {/* Notice Footer */}
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                Dự kiến hoàn tất lúc <strong>17:30 hôm nay</strong> tại 01 Lê Thánh Tôn.
              </span>
              <button
                onClick={() => alert('Chi tiết đơn mài lắp: Kính đang được lắp vào gọng Bolon Titan tại phòng Lab Q.1')}
                className="text-[11px] font-bold text-[#074768] hover:text-[#0284c7] underline"
              >
                Chi tiết đơn
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Bảo Hành Điện Tử & Ưu Đãi Của Bạn */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Bảo Hành Điện Tử (Ảnh 1) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Bảo Hành Điện Tử</h3>
              <span className="text-[11px] font-semibold text-slate-400">02 sản phẩm</span>
            </div>

            {/* Product 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Gọng Ray-Ban Aviator</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Còn 240 ngày
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">Serial: RB-98240-IT</p>
              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#074768] h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Tròng Crizal Prevencia</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Còn 310 ngày
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">e-Warranty: WAR-ESS-2026</p>
              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#074768] h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Free service footer link */}
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#074768]" /> Vệ sinh & căn chỉnh miễn phí
              </span>
              <button
                onClick={() => setActiveTab('warranty')}
                className="font-bold text-[#074768] hover:text-[#0284c7] transition"
              >
                Quyền lợi →
              </button>
            </div>
          </div>

          {/* Card: Ưu Đãi Của Bạn (Ảnh 1) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Ưu Đãi Của Bạn</h3>
              <span className="text-[11px] font-semibold text-slate-400">1 mã sẵn dùng</span>
            </div>

            {/* Voucher Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/50 border border-sky-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#074768] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  GIẢM 20%
                </span>
                <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Còn 7 ngày
                </span>
              </div>

              <div>
                <h4 className="font-black text-xs text-slate-900">Nâng cấp tròng Đổi Màu Gen 8</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Áp dụng khi nâng cấp tròng tại hệ thống showroom.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono font-bold text-xs bg-white px-3 py-1 rounded-lg border border-slate-200 text-[#074768]">
                  TRANS20
                </span>
                <button
                  onClick={() => handleCopy('TRANS20')}
                  className="bg-[#074768] hover:bg-[#09577f] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95"
                >
                  {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

