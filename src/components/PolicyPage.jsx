import React, { useState } from 'react';
import {
  ShieldCheck, Clock, RefreshCw, Sparkles, ChevronDown,
  ChevronUp, Phone, FileText, ArrowRight, Award, Check
} from 'lucide-react';

export default function PolicyPage({ setActiveTab }) {
  const [activeTabTerm, setActiveTabTerm] = useState('LENS'); // LENS, RETURN, ACTIVATE, RECEIVE
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Nếu tôi đeo tròng kính mới bị chếnh choáng hoặc nhức đầu thì có được đổi độ không?',
      a: 'HOÀN TOÀN ĐƯỢC. Với gói Bảo Hiểm Khúc Xạ 180 Ngày, bạn có thể đến bất kỳ chi nhánh nào để được Bác sĩ kiểm tra lại độ thích nghi thị lực và đổi sang cặp tròng mới 100% miễn phí mà không cần trả thêm bất kỳ chi phí nào.',
    },
    {
      q: 'Tôi ở tỉnh xa muốn bảo hành gọng kính thì gửi về đâu và ai chịu phí vận chuyển?',
      a: 'OptiVision áp dụng chính sách Bảo Hành Vận Chuyển 0đ hai chiều toàn quốc. Bạn chỉ cần gửi yêu cầu trực tuyến trên web, nhân viên bưu tá sẽ đến tận nhà nhận kính nguyên hộp và giao trả lại sau khi hoàn tất kỹ thuật.',
    },
    {
      q: 'Tôi bị mất hóa đơn và biên nhận giấy thì có được hưởng chính sách bảo hành không?',
      a: 'CÓ. Toàn bộ thông tin đơn hàng và phiếu bảo hành của quý khách đều được số hóa 100% trên hệ thống E-Warranty CRM. Chỉ cần cung cấp Số điện thoại đặt hàng là có thể tra cứu và bảo hành ngay.',
    },
    {
      q: 'Đệm mũi silicon sau 6 tháng có dấu hiệu ố vàng có được thay miễn phí không?',
      a: 'CÓ. Quyền lợi Chăm Sóc & Vệ Sinh Siêu Âm Trọn Đời áp dụng không giới hạn lượt dùng: bạn được miễn phí thay đệm ve mũi silicon y tế mới và làm sạch bằng máy sóng siêu âm 40kHz bất kỳ lúc nào.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Header Banner (Ảnh 5 chuẩn xác) */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-indigo-50/40 rounded-3xl border border-sky-200 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#074768] text-white">
            TIÊU CHUẨN LÂM SÀNG BẢO PHỦ WAR & BR-365 / 00
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Chính Sách Bảo Hành & Quyền Lợi Hậu Mãi Toàn Diện
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Minh bạch • Trách nhiệm • Đồng hành chăm sóc thị lực trọn đời của bạn. Chúng tôi cam kết bảo vệ đôi mắt và quyền lợi người dùng qua hệ sinh thái E-Warranty thông minh.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setActiveTab('warranty')}
              className="bg-[#074768] hover:bg-[#09577f] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>Tra Cứu Bảo Hành Điện Tử</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('faq-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              Câu Hỏi Thường Gặp
            </button>
          </div>
        </div>

        {/* E-WAR Card */}
        <div className="bg-white p-6 rounded-3xl border border-sky-200 shadow-md text-center shrink-0 space-y-2">
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider block">
            E-WAR ACTIVE
          </span>
          <div className="text-3xl font-black text-[#074768]">100% Số Hóa</div>
          <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
            Liên kết tự động hồ sơ bệnh án & đơn hàng theo số điện thoại (FR-CRM).
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Tiêu chuẩn ISO 9001
          </div>
        </div>
      </div>

      {/* 2. 4 Đặc Quyền Vàng Dành Riêng Khách Hàng (Ảnh 5) */}
      <section className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
            CAM KẾT ĐỘC QUYỀN
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            4 Đặc Quyền Vàng Dành Riêng Khách Hàng OptiVision
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Bảo chứng lâm sàng cao nhất trên từng cặp tròng và gọng kính được lắp ráp theo quy trình.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. 180 NGÀY */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7] transition space-y-3 flex flex-col justify-between">
            <div>
              <span className="bg-sky-100 text-[#0369a1] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                180 NGÀY
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-2">
                Bảo Hiểm Độ Khúc Xạ 180 Ngày
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Đổi tròng kính mới 100% miễn phí nếu bạn cảm thấy mỏi mắt, không kịp thích nghi độ mới hoặc có biến động khúc xạ trong 6 tháng đầu tiên.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('claim-warranty')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1 pt-2"
            >
              <span>Áp dụng mọi loại tròng đơn/đa tròng</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 2. 365 NGÀY */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7] transition space-y-3 flex flex-col justify-between">
            <div>
              <span className="bg-sky-100 text-[#0369a1] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                365 NGÀY
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-2">
                Bảo Hành Kỹ Thuật Gọng 365 Ngày
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hàn chữa thay ốc đầu, căn chỉnh gá gọng, thay thế ốc vít hụt, hàn đuôi laser và đổi gọng mới nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('claim-warranty')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1 pt-2"
            >
              <span>Tiêu chuẩn phụ kiện chính hãng</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 3. 07 NGÀY */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7] transition space-y-3 flex flex-col justify-between">
            <div>
              <span className="bg-sky-100 text-[#0369a1] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                07 NGÀY
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-2">
                Đổi Mẫu Gọng Kính Trong 07 Ngày
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Đổi sang mẫu gọng kính khác hoàn toàn linh hoạt nếu bạn cảm thấy chưa thật sự ưng ý khuôn mặt hoặc form kính sau thời gian trải nghiệm thực tế.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('claim-warranty')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1 pt-2"
            >
              <span>Không thu phụ phí thẩm định</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 4. TRỌN ĐỜI */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7] transition space-y-3 flex flex-col justify-between">
            <div>
              <span className="bg-sky-100 text-[#0369a1] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                TRỌN ĐỜI
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-2">
                Chăm Sóc & Vệ Sinh Siêu Âm
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Miễn phí thay đệm mũi Silicon y tế kháng khuẩn, thay ve mũi mới và rửa sạch sâu bằng máy sóng siêu âm 40kHz tại toàn bộ hệ thống showroom trên toàn quốc.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('booking')}
              className="text-xs font-bold text-[#074768] hover:text-[#0284c7] flex items-center gap-1 pt-2"
            >
              <span>Áp dụng không giới hạn lượt dùng</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Section 2 Ảnh Thực Tế Phòng Khám (Ảnh 5) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-3xl overflow-hidden aspect-16/9 bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1582142839970-2b9da988941f?w=800"
            alt="Kiểm tra quang học"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end text-white space-y-1.5">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">
              TRANG THIẾT BỊ CHUYÊN BIỆT
            </span>
            <h4 className="font-bold text-sm sm:text-base">
              Quy trình kiểm tra tâm quang học và lớp phủ tròng kính chuẩn quốc tế
            </h4>
            <p className="text-xs text-slate-300 font-normal">
              Hệ thống quang học tự động kiểm soát quang sai và độ khúc xạ chuẩn xác từng micromet trước khi bàn giao cho quý khách.
            </p>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-16/9 bg-slate-900 group">
          <img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"
            alt="Chuyên gia quang học"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end text-white space-y-1.5">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">
              ĐỘI NGŨ KỸ THUẬT VIÊN
            </span>
            <h4 className="font-bold text-sm sm:text-base">
              Bàn tay tinh xảo từ chuyên gia khúc xạ
            </h4>
            <p className="text-xs text-slate-300 font-normal">
              Được đào tạo liên tục theo quy chuẩn nhãn khoa quốc tế, bảo đảm mỗi cặp kính là một kiệt tác vừa vặn hoàn hảo.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Chi Tiết Điều Khoản & Hướng Dẫn Vận Hành (Ảnh 5) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              NỘI DUNG QUY ĐỊNH
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Chi Tiết Điều Khoản & Hướng Dẫn Vận Hành
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {[
              { id: 'LENS', label: 'Tròng Kính' },
              { id: 'RETURN', label: 'Đổi Trả & Hoàn Tiền' },
              { id: 'ACTIVATE', label: 'Kích Hoạt E-Warranty' },
              { id: 'RECEIVE', label: 'Quy Trình Tiếp Nhận' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabTerm(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${activeTabTerm === tab.id
                    ? 'bg-[#074768] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Terms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-extrabold text-slate-900">Lớp Phủ Váng Dầu Chống Chói</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Bảo hành 12 tháng đối với hiện tượng rộp váng, bong tróc lớp mạ chống ánh sáng xanh UV400 hoặc lớp phủ loang màu quang học do lỗi trục vật liệu của nhà sản xuất (Essilor, Zeiss, Chemi, Hoya).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-extrabold text-slate-900">Sai Lệch Tâm & Trục Khúc Xạ</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Hỗ trợ gia công cắt lại miễn phí 100% nếu phát hiện độ mờ, vát chéo, đảo ảnh sai tâm đồng tử (PD) so với phiếu kết quả khám thị lực đã duyệt ban đầu.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-extrabold text-slate-900">Chính Sách Trợ Giá Trầy Xước</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Trường hợp tròng kính bị xước xát sâu do ngoại lực hoặc sự cố ngoài vùng bảo hành trong năm đầu tiên, khách hàng được hưởng quyền lợi trợ giá 30% - 50% khi nâng cấp lên cặp tròng cùng phân khúc.
            </p>
          </div>
        </div>

        {/* Pro Tip Callout */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-600 leading-relaxed">
          <strong>Lưu ý chuyên môn:</strong> Không áp dụng bảo hành cho các trường hợp để kính ở nhiệt độ trên 60°C (như để trong cốp xe máy, taplo ô tô dưới trời nắng gắt) hoặc các tiếp xúc hóa chất tẩy rửa công nghiệp mạnh có tính kiềm/axit.
        </div>
      </section>

      {/* 5. Câu Hỏi Thường Gặp Về Bảo Hành Kính Mắt (Accordion - Ảnh 5) */}
      <section id="faq-section" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Câu Hỏi Thường Gặp Về Bảo Hành Kính Mắt
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Những câu hỏi phổ biến được quy định chi tiết theo tiêu chuẩn dịch vụ khách hàng OptiVision.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#074768]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Banner Hỗ Trợ Khẩn Cấp Cuối Trang (Ảnh 5) */}
      <section className="bg-[#053752] text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Phone className="w-3.5 h-3.5" /> HỖ TRỢ KỸ THUẬT NHÃN KHOA 24/7
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Cần Hỗ Trợ Xử Lý Bảo Hành Gấp?
          </h3>
          <p className="text-xs text-slate-200 mt-1 max-w-xl">
            Tổng đài chăm sóc khách hàng và các chuyên viên thị lực lâm sàng sẵn sàng giải đáp mọi khúc mắc từ 08:30 đến 21:30 hàng ngày.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="tel:19006868"
            className="bg-white text-[#053752] px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm hover:bg-sky-50 transition"
          >
            <Phone className="w-4 h-4 text-[#053752]" />
            <span>Hotline: 1900 6868</span>
          </a>
          <button
            onClick={() => setActiveTab('warranty')}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-3 rounded-xl font-bold text-xs transition"
          >
            Tra Cứu Bảo Hành Đơn Của Bạn
          </button>
        </div>
      </section>
    </div>
  );
}

