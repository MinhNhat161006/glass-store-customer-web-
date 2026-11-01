import React from 'react';
import {
  CheckCircle2, QrCode, Clock, ShieldCheck, Printer,
  MapPin, Phone, User, ArrowRight, Download, FileText, Wrench
} from 'lucide-react';

export default function OrderDetailHubPage({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Stepper (Ảnh 2 & 3 chuẩn xác) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Mã giao dịch mã hóa chuẩn SSL 256-bit • Cổng VNPay Gateway xác thực</span>
        </div>

        {/* 3 Step Wizard */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-slate-400">01 Giỏ Hàng</span>
          <span className="text-slate-300">➔</span>
          <span className="text-slate-400">02 Thanh Toán</span>
          <span className="text-slate-300">➔</span>
          <span className="text-[#074768] bg-sky-100 px-3 py-1 rounded-full font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#074768]"></span>
            03 Xác Nhận & Theo Dõi
          </span>
        </div>
      </div>

      {/* 2. Success Banner Box (Ảnh 2 & 3) */}
      <div className="bg-[#f0f9ff] border-2 border-sky-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#074768] text-white flex items-center justify-center shrink-0 shadow-md">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] text-[#0369a1] font-bold uppercase tracking-wider mb-0.5">
              Đơn hàng đã được xác nhận điện tử
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Đặt Hàng & Đăng Ký Gia Công Thành Công!
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Cảm ơn quý khách đã gửi gắm thị lực cho hệ thống chuẩn lâm sàng OptiVision. Đơn thuốc kính đã được khóa và tự động kết nối dây chuyền mài lắp Essilor Delta 200.
            </p>
          </div>
        </div>

        {/* Order code pill */}
        <div className="bg-white p-4 rounded-2xl border border-sky-200 text-left sm:text-right shrink-0 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            MÃ ĐƠN ĐẶT HÀNG DUY NHẤT
          </span>
          <span className="text-xl font-black font-mono text-[#074768]">
            #OPT-8842-SG
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            ⏱ Thời gian khởi tạo: 14:35 - Hôm nay
          </span>
        </div>
      </div>

      {/* 3. Main 2-Columns Layout (Ảnh 2 & 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Phiếu Gia Công Kính Kỹ Thuật Số & Tiến Độ Delta 200 */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Phiếu Gia Công Kính Kỹ Thuật Số */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#074768]" />
                <h3 className="font-black text-sm text-slate-900">
                  Phiếu Gia Công Kính Kỹ Thuật Số
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  Ticket ID: TK-2026-8842 • Chuẩn mài khúc xạ ISO
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                ✓ Đã thanh toán (VNPay QR)
              </span>
            </div>

            {/* Product combo */}
            <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=200&q=80"
                alt="Bolon Graceful"
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#074768] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    Gọng Chính Hãng
                  </span>
                  <span className="bg-sky-100 text-[#0369a1] text-[9px] font-bold px-2 py-0.5 rounded">
                    Titanium Cao Cấp
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900">
                  Bolon Graceful BJ3120 Rose Gold
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Kèm tròng: <strong>Essilor Crizal Sapphire HR 1.67</strong> (Lớp phủ chống chói 360°, chống tia cực tím UV400, hạn chế trầy xước gấp 3 lần).
                </p>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-1 font-mono">
                  <span>SKU: BLN-BJ3120-RG</span>
                  <span>Size: 51-18-145mm</span>
                  <span>Bảo hành tròng: 12 tháng</span>
                </div>
              </div>
            </div>

            {/* Locked Prescription Specs Table (Ảnh 2 & 3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-800 uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#074768]" />
                  Thông Số Khúc Xạ Thực Tế Khóa Gia Công
                </span>
                <span className="text-[11px] text-slate-500">
                  Khoảng cách đồng tử (PD): <strong>63 mm</strong>
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-6 bg-slate-50 p-2.5 font-bold text-slate-500 text-center text-[10px] uppercase border-b border-slate-200">
                  <div className="text-left pl-2">MẮT (EYE)</div>
                  <div>ĐỘ CẦU (SPH)</div>
                  <div>ĐỘ LOẠN (CYL)</div>
                  <div>TRỤC LOẠN (AXIS)</div>
                  <div>ĐỘ CỘNG (ADD)</div>
                  <div>ĐỘ RỘNG PD</div>
                </div>

                <div className="grid grid-cols-6 p-3 text-center items-center border-b border-slate-100 font-semibold text-slate-800">
                  <div className="text-left pl-2 font-bold text-[#074768]">OD Mắt Phải (Right)</div>
                  <div className="font-mono">-2.25 Diop</div>
                  <div className="font-mono">-0.50 Diop</div>
                  <div className="font-mono text-[#0284c7]">180°</div>
                  <div className="font-mono text-slate-400">-</div>
                  <div className="font-mono font-bold text-slate-900">31.5 mm</div>
                </div>

                <div className="grid grid-cols-6 p-3 text-center items-center font-semibold text-slate-800 bg-slate-50/50">
                  <div className="text-left pl-2 font-bold text-[#074768]">OS Mắt Trái (Left)</div>
                  <div className="font-mono">-1.75 Diop</div>
                  <div className="font-mono">-0.25 Diop</div>
                  <div className="font-mono text-[#0284c7]">175°</div>
                  <div className="font-mono text-slate-400">-</div>
                  <div className="font-mono font-bold text-slate-900">31.5 mm</div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Dữ liệu đo khám đồng bộ tự động từ Hồ sơ thị lực điện tử của Bác sĩ Khúc Xạ OptiVision ngày 12/03/2026.
              </p>
            </div>
          </div>

          {/* Card: Tiến Độ Chế Tác Tại Lab Essilor Delta 200 (Ảnh 2 & 3) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                  QUY TRÌNH GIA CÔNG KỸ THUẬT SỐ
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Tiến Độ Chế Tác Tại Lab Essilor Delta 200
                </h3>
              </div>
              <span className="text-xs font-bold text-[#074768] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                ⏱ Dự kiến sẵn sàng: 17:30 Hôm nay
              </span>
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Bước 01 */}
              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-[#074768] space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="bg-[#074768] text-white px-2 py-0.5 rounded">
                    Bước 01 • Đang thực hiện
                  </span>
                  <span className="text-slate-500 font-mono">60 phút</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Mài Lắp Tự Động Delta 200</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  Quét 3D gọng Bolon BJ3120, cắt tròng vát cạnh siêu mịn theo tâm quang học chính xác từng micromet.
                </p>
              </div>

              {/* Bước 02 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 opacity-80">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                    Bước 02 • Sắp tới
                  </span>
                  <span className="text-slate-500 font-mono">30 phút</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Kiểm Định Chất Lượng QC</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  Đo kiểm quang sai trên thiết bị Lensmeter chuẩn y khoa, vệ sinh siêu âm và đóng dấu niêm phong chống hàng giả.
                </p>
              </div>

              {/* Bước 03 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 opacity-80">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                    Bước 03 • Đích đến
                  </span>
                  <span className="text-[#074768] font-bold font-mono">17:30</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Bàn Giao & Nhận Kính</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  Sẵn sàng nhận tại Showroom Flagship Quận 1 hoặc chuyển phát hỏa tốc an toàn tận tay khách hàng.
                </p>
              </div>
            </div>

            {/* Lab Footer */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Xưởng Kỹ Thuật Lab Trung Tâm OptiVision Sài Gòn (88 Lê Thánh Tôn, Bến Nghé, Q.1)
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">
                ● Mạng lưới kết nối tín hiệu vệ tinh
              </span>
            </div>
          </div>

          {/* Card: Chính Sách Hậu Mãi Đã Kích Hoạt Tự Động */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Chính Sách Hậu Mãi Đã Kích Hoạt Tự Động
            </span>
            <p className="text-[11px] text-slate-400">
              Hệ thống OptiVision CRM đã liên kết số điện thoại <strong>0918 732 998</strong> với các gói bảo hiểm thị lực đặc quyền:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900">E-Warranty 12 Tháng</h5>
                <p className="text-[11px] text-slate-500">Bảo hành điện tử chính hãng cho gọng Bolon và lớp phủ váng tròng Essilor Crizal Sapphire HR.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900">Bảo Hiểm Độ 180 Ngày</h5>
                <p className="text-[11px] text-slate-500">Đổi tròng miễn phí 100% trong vòng 6 tháng nếu mắt bạn có sự thay đổi độ khúc xạ hoặc không thích nghi.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h5 className="font-bold text-slate-900">Căn Chỉnh Trọn Đời</h5>
                <p className="text-[11px] text-slate-500">Miễn phí thay đệm mũi, vệ sinh bằng sóng siêu âm và nắn chỉnh form gọng tại bất kỳ showroom toàn quốc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Mã QR Check-In, Thông Tin Người Nhận & Tóm Tắt Thanh Toán */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Mã QR Check-in Showroom (Ảnh 2 & 3 chuẩn xác) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-center">
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              THẺ ĐIỆN TỬ THÔNG MINH
            </span>
            <h3 className="font-black text-base text-slate-900">Mã QR Check-in Showroom</h3>
            <p className="text-[11px] text-slate-500">
              Xuất trình mã này tại quầy POS hoặc kiosk tiếp tân khi đến nhận kính tại Flagship Q.1.
            </p>

            {/* Big QR Placeholder */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
              <div className="w-44 h-44 bg-white rounded-xl border border-slate-300 p-3 flex flex-col items-center justify-center mx-auto">
                <QrCode className="w-36 h-36 text-slate-800" />
              </div>
              <span className="font-mono font-bold text-xs text-[#074768] mt-2 block">
                ID: 8842-SG-VNPAY-PASS
              </span>
              <span className="text-[10px] text-slate-400">Mã có hiệu lực trong 48 giờ tới</span>
            </div>
          </div>

          {/* Card: Thông Tin Người Nhận */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3.5 text-xs text-slate-600">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#074768]" />
                Thông Tin Người Nhận
              </span>
              <span className="text-[10px] bg-sky-50 text-[#0369a1] font-bold px-2 py-0.5 rounded">
                Giao hàng hỏa tốc
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Khách hàng:</span>
              <strong className="text-slate-900 text-xs">Nguyễn Trần Bảo Long</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Số điện thoại:</span>
              <strong className="text-slate-900 font-mono text-xs">0918 732 998</strong>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Địa chỉ bàn giao:</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                Tầng 14 Vincom Center, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Phương thức:</span>
              <span className="font-bold text-emerald-700">VNPay QR (Đã thanh toán)</span>
            </div>
          </div>

          {/* Card: Tóm Tắt Thanh Toán */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="font-black text-sm text-slate-900 pb-2 border-b border-slate-100">
              Tóm Tắt Thanh Toán
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Gọng Bolon Graceful BJ3120:</span>
                <span className="font-semibold text-slate-800">3.880.000 đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tròng Essilor Crizal Sapphire HR 1.67:</span>
                <span className="font-semibold text-slate-800">2.450.000 đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí gia công mài lắp tự động Delta 200:</span>
                <span className="font-semibold text-emerald-700">Miễn phí (VIP)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí vận chuyển hỏa tốc:</span>
                <span className="font-semibold text-emerald-700">Miễn phí</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
                <span>Tổng thanh toán:</span>
                <span className="text-xl text-[#074768]">6.330.000 đ</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setActiveTab('review')}
                className="w-full bg-[#074768] hover:bg-[#09577f] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
              >
                <span>⭐ Đánh Giá Trải Nghiệm Khúc Xạ (+Voucher 50K)</span>
              </button>

              <button
                onClick={() => alert('Đang in phiếu đơn hàng và thông số kính...')}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Phiếu Đơn Hàng & Thông Số Kính</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-[#074768] pt-1 block"
              >
                ← Tiếp Tục Mua Sắm Sản Phẩm Khác
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

