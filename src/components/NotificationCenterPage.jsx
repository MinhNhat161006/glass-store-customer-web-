import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, Clock, Calendar, ShieldCheck, 
  Tag, Download, ArrowRight, Settings, Phone, Wrench, Sparkles, Truck 
} from 'lucide-react';

export default function NotificationCenterPage({ setActiveTab }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [webNotify, setWebNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(true);
  const [zaloNotify, setZaloNotify] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Breadcrumb & Controls (Ảnh 2 chuẩn xác) */}
      <div>
        <nav className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
          <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
            Trang Chủ
          </span>
          <span>/</span>
          <span className="text-slate-500">Tài Khoản & Trung Tâm Hỗ Trợ</span>
          <span>/</span>
          <span className="text-[#074768] font-bold">Trung Tâm Thông Báo Hệ Thống</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trung Tâm Thông Báo & Cập Nhật Hệ Thống
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo dõi thông báo thời gian thực về tiến độ gia công mài lắp kính, biến động vận chuyển, lịch nhắc đo mắt và các ưu đãi thành viên OptiVision.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-xs">
            <span className="bg-sky-50 text-[#0369a1] border border-sky-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse"></span>
              3 thông báo mới chưa đọc
            </span>
            <button
              onClick={() => alert('Đã đánh dấu tất cả thông báo là đã đọc!')}
              className="text-slate-500 hover:text-[#074768] font-semibold underline"
            >
              ✓ Đánh dấu tất cả là đã đọc
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-bold no-scrollbar">
        {[
          { id: 'ALL', label: 'Tất Cả (8)' },
          { id: 'LAB', label: 'Tiến Độ Gia Công Lab (4)' },
          { id: 'REMIND', label: 'Lịch Nhắc Đo Khám Mắt (2)' },
          { id: 'WARRANTY', label: 'Bảo Hành & Hậu Mãi (2)' },
          { id: 'PROMO', label: 'Khuyến Mãi & Quà' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
              selectedFilter === tab.id
                ? 'bg-[#074768] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 bg-white border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main 2-Columns Body: Timeline (Left) + Live Widget & Switches (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Notification Timeline (Ảnh 2 chuẩn xác) */}
        <div className="lg:col-span-8 space-y-8">
          {/* GROUP 1: HÔM NAY (3 thông báo mới) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                HÔM NAY • Cập nhật thời gian thực
              </span>
              <span className="text-[11px] text-[#0284c7] font-semibold">3 mới</span>
            </div>

            {/* Notification 1: Tiến độ Lab Delta 200 */}
            <div className="p-5 rounded-3xl bg-white border-2 border-sky-300 shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-400">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
                    <Wrench className="w-3.5 h-3.5" />
                  </span>
                  <span>Tiến Độ Lab & Vận Chuyển • 15 phút trước</span>
                  <span>• #OPT-8842-SG</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Đã hoàn tất mài lắp tự động Essilor Delta 200 & Kiểm định QC quang học
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Kính đã vượt qua tiêu chuẩn quang tâm sai số &lt; 0.05mm. Hiện đang được đóng gói khử khuẩn chống sốc tiêu chuẩn y khoa và bàn giao cho đối tác GrabExpress hỏa tốc 2H.
                </p>
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="w-3.5 h-3.5 text-[#0284c7]" />
                  Giao hàng hỏa tốc nội thành: <strong>Dự kiến nhận lúc 16:45 hôm nay</strong>
                </span>
                <button
                  onClick={() => setActiveTab('order-hub')}
                  className="bg-[#074768] hover:bg-[#09577f] text-white px-3.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 transition self-end sm:self-auto shrink-0"
                >
                  <span>Theo dõi đơn hàng</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Notification 2: Lịch Hẹn Khám Khúc Xạ */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-400">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                  </span>
                  <span>Lịch Hẹn Đo Mắt 12 Bước • 2 giờ trước</span>
                  <span>• #LICH-2026-889</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Nhắc lịch hẹn khám khúc xạ cùng Kỹ Thuật Viên Lâm Hoàng Phúc
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Lịch khám 12 bước của quý khách sẽ diễn ra vào lúc <strong>09:30 Thứ Bảy ngày mai</strong> tại Flagship Quận 1 (85 Lê Thánh Tôn). Quý khách lưu ý ngưng đeo kính áp tròng trước 24h để kết quả khúc xạ chính xác nhất.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500">📍 Phòng Khúc Xạ Y Khoa Tầng 2, Flagship Q.1</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="text-slate-600 hover:text-slate-900 font-bold text-[11px] px-3 py-1"
                  >
                    Đổi giờ hẹn
                  </button>
                  <button
                    onClick={() => alert('Đang mở thẻ e-Pass check-in phòng khám QR...')}
                    className="bg-[#074768] hover:bg-[#09577f] text-white px-3.5 py-1.5 rounded-xl font-bold text-[11px]"
                  >
                    Xem thẻ hẹn e-Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Notification 3: Thưởng Đánh Giá Dịch Vụ */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-400">
                  <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <span>Thưởng Đánh Giá Dịch Vụ • 4 giờ trước</span>
                  <span>• #REVIEW50K</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Đã tặng Voucher 50.000đ vào ví quà tặng VIP của quý khách
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Cảm ơn quý khách đã gửi phản hồi chi tiết về độ êm của gọng Bolon & trải nghiệm đo khám chuyên sâu. Mã giảm giá đã tự động kích hoạt, áp dụng cho mọi phụ kiện & dung dịch lau tròng nano.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Hạn dùng: 30 ngày
                </span>
                <button
                  onClick={() => setActiveTab('vouchers')}
                  className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1"
                >
                  <span>Xem ví voucher</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* GROUP 2: HÔM QUA (2 thông báo) */}
          <div className="space-y-4">
            <span className="font-extrabold text-xs text-slate-400 uppercase tracking-wider block">
              HÔM QUA • 2 thông báo
            </span>

            {/* Notification 4 */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Thanh Toán Trực Tuyến • 14:35 Hôm qua</span>
                <span>#VNPAY-QR-99201</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">
                Xác nhận giao dịch 6.330.000đ cho đơn hàng #OPT-8842-SG
              </h4>
              <p className="text-[11px] text-slate-500">
                Giao dịch thành công qua cổng VNPay-QR. Hóa đơn điện tử VAT (e-Invoice) đã gửi kèm bản ký y tế vào hộp thư email cá nhân của quý khách.
              </p>
              <button
                onClick={() => alert('Đang tải hóa đơn VAT điện tử...')}
                className="text-[11px] font-bold text-[#074768] hover:underline flex items-center gap-1 pt-1"
              >
                <Download className="w-3 h-3" /> Tải e-Invoice (PDF)
              </button>
            </div>

            {/* Notification 5 */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Bảo Hành Điện Tử • 14:36 Hôm qua</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">
                Kích hoạt e-Warranty: Gọng Bolon Graceful & Tròng Crizal Sapphire HR
              </h4>
              <p className="text-[11px] text-slate-500">
                Hệ thống đám mây đã ghi nhận serial chống hàng giả toàn cầu. Thời hạn bảo hành lớp phủ váng tròng chống chói & lỗi gọng kính là 365 ngày kể từ ngày kích hoạt.
              </p>
              <button
                onClick={() => setActiveTab('warranty')}
                className="text-[11px] font-bold text-[#074768] hover:underline flex items-center gap-1 pt-1"
              >
                <ShieldCheck className="w-3 h-3" /> Tra cứu sổ bảo hành
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Order Widget & Notification Switches (Ảnh 2) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Card: Đơn Hàng Đang Gia Công (LIVE) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#074768]" />
                Đơn Hàng Đang Gia Công
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● LIVE
              </span>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-mono font-bold text-xs text-[#074768]">#OPT-8842-SG</span>
                <span className="font-black text-sm text-[#074768]">90%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                <div className="bg-[#074768] h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>

              <div className="grid grid-cols-4 text-center text-[9px] font-semibold text-slate-400">
                <span className="text-emerald-700 font-bold">Tiếp nhận</span>
                <span className="text-emerald-700 font-bold">Đo tâm 3D</span>
                <span className="text-[#074768] font-bold">Mài Lab</span>
                <span>Giao hàng</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div>KTV Phụ trách: <strong>Trần Minh Anh</strong></div>
              <div className="text-[10px] text-slate-400">Chứng chỉ Khúc Xạ Quốc Tế WCO AWN-882</div>
            </div>
          </div>

          {/* Card: Cài Đặt Nhận Thông Báo (Ảnh 2) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div>
              <h4 className="font-black text-sm text-slate-900">Cài Đặt Nhận Thông Báo</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Lựa chọn đa kênh (Omnichannel) để không bỏ lỡ tiến độ mài kính và thời gian khám mắt.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Switch 1 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                <div>
                  <strong className="block text-slate-800 text-xs">Thông báo trên Web</strong>
                  <span className="text-[10px] text-slate-400">Cảnh báo tức thời trên trình duyệt Chrome/Safari</span>
                </div>
                <input
                  type="checkbox"
                  checked={webNotify}
                  onChange={(e) => setWebNotify(e.target.checked)}
                  className="w-4 h-4 rounded text-[#074768]"
                />
              </div>

              {/* Switch 2 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                <div>
                  <strong className="block text-slate-800 text-xs">SMS Tự Động & OTP</strong>
                  <span className="text-[10px] text-slate-400">Mã xác nhận đơn hàng & link check-in đo mắt</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotify}
                  onChange={(e) => setSmsNotify(e.target.checked)}
                  className="w-4 h-4 rounded text-[#074768]"
                />
              </div>

              {/* Switch 3 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                <div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-slate-800 text-xs">Zalo ZNS Tiện Ích</strong>
                    <span className="text-[9px] bg-sky-100 text-[#0369a1] font-bold px-1.5 rounded">Ưu tiên</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Nhắc lịch hẹn khám 12 bước & thẻ e-Pass có mã QR</span>
                </div>
                <input
                  type="checkbox"
                  checked={zaloNotify}
                  onChange={(e) => setZaloNotify(e.target.checked)}
                  className="w-4 h-4 rounded text-[#074768]"
                />
              </div>

              {/* Switch 4 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                <div>
                  <strong className="block text-slate-800 text-xs">Email Báo Cáo Khúc Xạ</strong>
                  <span className="text-[10px] text-slate-400">Bản PDF đơn thuốc kính & hóa đơn VAT e-Invoice</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="w-4 h-4 rounded text-[#074768]"
                />
              </div>
            </div>

            <button
              onClick={() => alert('Đã lưu thiết lập cấu hình kênh nhận thông báo!')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition"
            >
              Lưu Thiết Lập Kênh Nhận
            </button>
          </div>

          {/* Card: Cần Hỗ Trợ Đơn Gấp */}
          <div className="bg-[#053752] text-white p-5 rounded-3xl space-y-2 text-xs">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
              CẦN HỖ TRỢ ĐƠN GẤP?
            </span>
            <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
              Nếu cần điều chỉnh thông số độ cận, khoảng cách đồng tử (PD) hoặc chuyển địa chỉ nhận kính, hãy gọi ngay chuyên viên chăm sóc khách hàng:
            </p>
            <div className="pt-1 flex items-baseline justify-between">
              <span className="text-lg font-black text-white">1900 6868</span>
              <span className="text-[10px] text-sky-200 font-semibold">Nhánh 2 (Khúc Xạ)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

