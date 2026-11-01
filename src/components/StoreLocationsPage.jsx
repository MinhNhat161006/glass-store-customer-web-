import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, Search, ShieldCheck, 
  Car, Wrench, Calendar, ArrowRight, Eye, Navigation, CheckCircle2 
} from 'lucide-react';

export default function StoreLocationsPage({ setActiveTab }) {
  const [cityFilter, setCityFilter] = useState('ALL'); // ALL, HCM, HN, DN
  const [searchKeyword, setSearchKeyword] = useState('');
  const [quickFilters, setQuickFilters] = useState(['EXAM_12', 'FAST_30']);

  const toggleQuickFilter = (key) => {
    if (quickFilters.includes(key)) {
      setQuickFilters(quickFilters.filter(k => k !== key));
    } else {
      setQuickFilters([...quickFilters, key]);
    }
  };

  const showrooms = [
    {
      id: 'Q1',
      city: 'HCM',
      name: 'OptiVision Flagship Quận 1',
      tag: 'Flagship TP.HCM',
      distance: 'Cách bạn: 1.2 km',
      address: '85 Lê Thánh Tôn, P. Bến Nghé, Quận 1, TP.HCM',
      phone: '028 3822 6868',
      hours: '08:30 - 21:30 (Thứ 2 - CN)',
      headDoctor: 'BS. Khúc xạ Lâm Hoàng Phúc',
      equipment: 'Máy đo Topcon KR-800 Nhật Bản, Essilor Delta 200 Pháp',
      features: ['Đo mắt 12 bước', 'Lấy ngay 30 phút', 'Đậu xe hơi miễn phí'],
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'HK',
      city: 'HN',
      name: 'OptiVision Flagship Hoàn Kiếm',
      tag: 'Flagship Hà Nội',
      distance: 'Trung tâm Tràng Tiền',
      address: '24 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      phone: '024 3936 6868',
      hours: '08:30 - 21:30 (Thứ 2 - CN)',
      headDoctor: 'ThS. Đỗ Thùy Trang (ĐHY Hà Nội)',
      equipment: 'Hệ thống Topcon CV-5000 tự động, Essilor Pro Special 2.0',
      features: ['Đo mắt 12 bước', 'Lấy ngay 30 phút', 'Valet Parking ô tô'],
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'HC',
      city: 'DN',
      name: 'OptiVision Hải Châu – Đà Nẵng',
      tag: 'Chi Nhánh Đà Nẵng',
      distance: 'Tuyến phố tài chính',
      address: '102 Nguyễn Văn Linh, P. Nam Dương, Hải Châu, Đà Nẵng',
      phone: '0236 388 6868',
      hours: '08:30 - 21:30 (Thứ 2 - CN)',
      headDoctor: 'Cử nhân Khúc xạ Nguyễn Văn Bình',
      equipment: 'Máy đo khúc xạ Topcon KR-800, máy mài Nidek LE-900',
      features: ['Đo mắt 12 bước', 'Chỗ đậu xe rộng'],
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Q3',
      city: 'HCM',
      name: 'OptiVision Nguyễn Thị Minh Khai',
      tag: 'Chi Nhánh Quận 3',
      distance: 'Gần Công Viên Tao Đàn',
      address: '142 Nguyễn Thị Minh Khai, P. Võ Thị Sáu, Quận 3, TP.HCM',
      phone: '028 3930 6868',
      hours: '08:30 - 21:30 (Thứ 2 - CN)',
      headDoctor: 'Cử nhân Khúc xạ Trần Thu Hà',
      equipment: 'Hệ thống máy đo Topcon KR-800, máy định tâm đồng tử Visioffice',
      features: ['Đo mắt 12 bước', 'Lấy ngay 30 phút', 'Đậu xe ô tô'],
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const filteredShowrooms = showrooms.filter(s => {
    if (cityFilter !== 'ALL' && s.city !== cityFilter) return false;
    if (searchKeyword && !s.name.toLowerCase().includes(searchKeyword.toLowerCase()) && !s.address.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header Banner (Ảnh 1 chuẩn xác) */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-indigo-50/50 rounded-3xl border border-sky-200 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#074768] text-white">
            HỆ THỐNG PHÂN PHỐI & LÂM SÀNG ĐẠT CHUẨN Y KHOA
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Hệ Thống Cửa Hàng & Phòng Đo Khúc Xạ Chuẩn Y Khoa OptiVision
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Mạng lưới 16+ chi nhánh Flagship trang bị hệ thống máy đo mắt kỹ thuật số Topcon Nhật Bản và công nghệ mài lắp tự động vi điểm Essilor Pháp, kết nối trực tiếp với hồ sơ thị lực điện tử.
          </p>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center p-3.5 bg-white rounded-2xl border border-sky-200 shadow-sm min-w-[76px]">
            <span className="text-2xl font-black text-[#074768]">16</span>
            <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Chi Nhánh</span>
          </div>
          <div className="text-center p-3.5 bg-white rounded-2xl border border-sky-200 shadow-sm min-w-[76px]">
            <span className="text-2xl font-black text-[#074768]">12</span>
            <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Bước Đo Khúc Xạ</span>
          </div>
          <div className="text-center p-3.5 bg-white rounded-2xl border border-sky-200 shadow-sm min-w-[76px]">
            <span className="text-2xl font-black text-[#074768]">30'</span>
            <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Lấy Kính Ngay</span>
          </div>
        </div>
      </div>

      {/* 2. City Filter & Search Bar (Ảnh 1) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* City Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'ALL', label: 'Tất cả (16)' },
              { id: 'HCM', label: 'TP. Hồ Chí Minh (9)' },
              { id: 'HN', label: 'Hà Nội (5)' },
              { id: 'DN', label: 'Đà Nẵng (2)' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setCityFilter(chip.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  cityFilter === chip.id
                    ? 'bg-[#074768] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Tìm theo đường, quận hoặc bác sĩ..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#074768]"
            />
          </div>
        </div>

        {/* Quick Facility Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <span className="text-[11px] font-semibold text-slate-400">Lọc tiện ích chuẩn:</span>
          {[
            { id: 'EXAM_12', label: 'Phòng đo mắt 12 bước' },
            { id: 'FAST_30', label: 'Xưởng mài kính 30 phút' },
            { id: 'PARKING', label: 'Chỗ đậu xe ô tô' },
            { id: 'OPEN_LATE', label: 'Mở cửa đến 21:30' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => toggleQuickFilter(f.id)}
              className={`px-3 py-1 rounded-lg border text-[11px] font-medium transition ${
                quickFilters.includes(f.id)
                  ? 'border-[#074768] bg-sky-50 text-[#074768] font-bold'
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              ✓ {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main 2-Columns Body: Showroom List (Left) + Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Showroom Cards List (Ảnh 1 chuẩn xác) */}
        <div className="lg:col-span-7 space-y-5">
          {filteredShowrooms.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition duration-300 flex flex-col sm:flex-row"
            >
              {/* Photo Frame */}
              <div className="sm:w-56 h-48 sm:h-auto relative bg-slate-100 shrink-0">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#074768] text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                  {store.tag}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-sm text-slate-900">{store.name}</h3>
                    <span className="text-[10px] font-mono text-[#0284c7] font-semibold bg-sky-50 px-2 py-0.5 rounded">
                      {store.distance}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] flex items-start gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#074768] shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1 font-mono font-semibold text-slate-600">
                      <Phone className="w-3 h-3 text-[#074768]" /> {store.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#074768]" /> {store.hours}
                    </span>
                  </div>

                  <div className="pt-2 text-[10px] text-slate-500 space-y-0.5">
                    <div>Trưởng phòng đo: <strong>{store.headDoctor}</strong></div>
                    <div className="text-slate-400 truncate">Trang bị: {store.equipment}</div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-2">
                    {store.features.map((feat, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2 Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => alert(`Đang mở Google Maps dẫn đường tới ${store.name}...`)}
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Navigation className="w-3.5 h-3.5 text-slate-500" />
                    <span>Chỉ Đường</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('booking')}
                    className="flex-1 bg-[#074768] hover:bg-[#09577f] text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-sky-200" />
                    <span>Đặt Lịch Đo Mắt Tại Đây</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Map View & Fast Delivery Hub (Ảnh 1 chuẩn xác) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          {/* Map Frame Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#074768]" />
                Bản Đồ Mạng Lưới Chi Nhánh
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Trực Tuyến
              </span>
            </div>

            {/* Simulated interactive map image */}
            <div className="relative h-64 bg-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Map view"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-bold text-[#074768] shadow-sm">
                ● Phủ sóng bán kính 15km nội thành
              </div>

              {/* Pin Callout Box */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Flagship Lê Thánh Tôn (Q.1)</h5>
                  <p className="text-[10px] text-slate-500">Bán kính hỗ trợ giao 2h: Toàn bộ Q.1, Q.3, Q.4, Q.Bình Thạnh</p>
                </div>
                <button
                  onClick={() => alert('Xem chi tiết tọa độ GPS')}
                  className="bg-[#074768] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0"
                >
                  Xem Pin
                </button>
              </div>
            </div>
          </div>

          {/* Dịch Vụ Giao Kính Hỏa Tốc Trong 2 Giờ Card (Ảnh 1) */}
          <div className="bg-sky-50 rounded-3xl border border-sky-200 p-5 space-y-2 text-xs">
            <span className="font-black text-xs text-[#074768] flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#0284c7]" />
              Dịch Vụ Giao Kính Hỏa Tốc Trong 2 Giờ
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Đơn hàng gọng kính có sẵn và tròng mài lắp ngay trong bán kính 10km quanh mỗi showroom sẽ được chuyên viên giao nhanh bọc chống sốc cẩn thận và giao tận tay trong 120 phút.
            </p>
          </div>

          {/* Hotline Emergency Box (Ảnh 1) */}
          <div className="bg-[#053752] text-white p-6 rounded-3xl shadow-md space-y-3">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
              HỖ TRỢ TÌM CỬA HÀNG GẦN NHẤT
            </span>
            <h4 className="font-bold text-sm text-white">Cần hướng dẫn đường đi hoặc giữ chỗ đo?</h4>
            <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
              Đội ngũ điều phối viên phòng khám OptiVision luôn sẵn sàng tư vấn định vị và giữ phòng khám riêng cho bạn.
            </p>
            <a
              href="tel:19006868"
              className="inline-flex items-center gap-2 bg-white text-[#053752] px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:bg-sky-50 transition"
            >
              <Phone className="w-4 h-4 text-[#053752]" />
              <span>Gọi 1900 6868 (Miễn cước 24/7)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Tiêu Chuẩn Dịch Vụ Đồng Nhất Tại Mọi Chi Nhánh (Chân trang - Ảnh 1) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
            QUY CHUẨN PHÒNG KHÁM KHÚC XẠ
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Tiêu Chuẩn Dịch Vụ Đồng Nhất Tại Mọi Chi Nhánh
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Mỗi chi nhánh OptiVision không chỉ là showroom trưng bày thời trang cao cấp mà còn là một trung tâm khúc xạ lâm sàng độc lập tuân thủ quy trình kiểm định nhãn khoa nghiêm ngặt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#074768] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-200" />
            </div>
            <h4 className="font-extrabold text-slate-900">100% Kỹ Thuật Viên Chính Quy</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Tất cả chuyên viên phụ trách đo khúc xạ tại phòng máy đều tốt nghiệp Đại học Y khoa chuyên ngành Khúc xạ Nhãn khoa (Optometry) với chứng chỉ hành nghề độc lập được Bộ Y Tế cấp phép.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 block pt-1">
              ✓ Cam kết chẩn đoán chuẩn xác 100%
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#074768] text-white flex items-center justify-center font-bold">
              <Eye className="w-4 h-4 text-sky-200" />
            </div>
            <h4 className="font-extrabold text-slate-900">Quy Trình Đo Khám 12 Bước Miễn Phí</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Kiểm tra toàn diện từ soi bóng đồng tử, thăng bằng hai mắt, đo biên độ điều tiết, độ quy tụ, đến kiểm tra tương phản thị giác. Hoàn toàn miễn phí khi đặt lịch hẹn trực tuyến.
            </p>
            <span className="text-[10px] font-bold text-[#0284c7] block pt-1">
              ✓ Thời gian đo tiêu chuẩn: 15 - 20 phút
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#074768] text-white flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4 text-sky-200" />
            </div>
            <h4 className="font-extrabold text-slate-900">Căn Chỉnh & Siêu Âm Trọn Đời</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Khách hàng ghé bất kỳ chi nhánh nào trong hệ thống đều được làm sạch sâu kính bằng sóng siêu âm cao tần, thay đệm mũi silicon kháng khuẩn và căn chỉnh độ ôm vòm thái dương trọn đời miễn phí.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 block pt-1">
              ✓ Áp dụng trên toàn quốc cho mọi sản phẩm
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

