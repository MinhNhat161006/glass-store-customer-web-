import React, { useState } from 'react';
import {
  ShieldCheck, Upload, MapPin, Truck, Check,
  AlertCircle, ArrowRight, X, Phone, Clock, FileText
} from 'lucide-react';

export default function ClaimWarrantyPage({ setActiveTab }) {
  const [selectedOrder, setSelectedOrder] = useState('OPT-8842-SG');
  const [claimType, setClaimType] = useState('RX_INSURANCE'); // RX_INSURANCE, FRAME_TECH, LENS_WARRANTY, EXCHANGE_7D
  const [description, setDescription] = useState(
    'Khi đeo kính làm việc trước màn hình máy tính khoảng 30 phút, mắt trái cảm thấy bị nhức mỏi và có cảm giác hơi choáng nhẹ...'
  );
  const [deliveryMethod, setDeliveryMethod] = useState('SHOWROOM');
  const [selectedBranch, setSelectedBranch] = useState('Q1');
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { name: 'anh_mat_kinh_trai_lap_p...', url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=300' },
    { name: 'khop_ban_le_cang_phai...', url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300' },
  ]);

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    alert(
      '🎉 YÊU CẦU HẬU MÃI ĐÃ ĐƯỢC TIẾP NHẬN!\n\n' +
      'Mã phiếu: HSKT-2026-9812\n' +
      'Chuyên viên phòng khám OptiVision sẽ gọi điện xác nhận trong vòng 2 giờ tới.\n' +
      'Cam kết xử lý và đổi tròng chuẩn tâm quang học hoàn toàn miễn phí.'
    );
    setActiveTab('warranty');
  };

  const removePhoto = (idx) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumb & Title Banner (Ảnh 4 chuẩn xác) */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5">
        <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
          Trang Chủ
        </span>
        <span>/</span>
        <span onClick={() => setActiveTab('warranty')} className="hover:text-[#074768] cursor-pointer">
          Trung Tâm Bảo Hành & Đổi Trả
        </span>
        <span>/</span>
        <span className="text-[#074768] font-bold">Gửi Yêu Cầu Hậu Mãi</span>
      </nav>

      <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-3xl border border-sky-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#074768] text-white mb-2">
            QUY CHUẨN LÂM SÀNG ISO 9001 - HẬU MÃI 5 SAO
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trung Tâm Hậu Mãi – Gửi Yêu Cầu Bảo Hành & Đổi Trả Kính Trực Tuyến
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Tiếp nhận xử lý sự cố tròng kính trầy xước, lệch tâm, không thích nghi độ, gọng cong vênh hoặc đổi size/mẫu trong vòng 07 ngày với tốc độ phê duyệt tức thì.
          </p>
        </div>

        {/* SLA commitment pill */}
        <div className="bg-white p-4 rounded-2xl border border-sky-200 text-left sm:text-right shrink-0 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            CAM KẾT TIẾN ĐỘ GIẢI QUYẾT
          </span>
          <span className="text-sm font-black text-[#074768] block mt-0.5">
            Phản hồi 2h • Xử lý 24h - 48h
          </span>
        </div>
      </div>

      {/* 2. Main 2-Columns Body (Ảnh 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 4-Step Claim Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmitClaim} className="space-y-6">
            {/* BƯỚC 1: Chọn sản phẩm & đơn hàng */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-black text-sm text-slate-900">
                    Chọn sản phẩm & đơn hàng cần bảo hành/đổi trả
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ● Đã đồng bộ đơn hàng
                </span>
              </div>

              {/* Order select */}
              <div>
                <select
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#074768]"
                >
                  <option value="OPT-8842-SG">
                    #OPT-8842-SG - Gọng Bolon Graceful BJ3120 + Tròng Essilor Crizal Sapphire HR 1.67
                  </option>
                  <option value="OPT-7731-HN">
                    #OPT-7731-HN - Kính Râm Ray-Ban Classic Wayfarer Polarized
                  </option>
                </select>
              </div>

              {/* Product Info Card preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200"
                    alt="Bolon"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
                  />
                  <div className="text-xs">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>Mã sản phẩm: BL-BJ3120-C10</span>
                      <span>• Ngày mua: 12/03/2026</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-xs mt-0.5">
                      Gọng Bolon Graceful BJ3120 Rose Gold + Tròng Essilor Crizal Sapphire HR 1.67
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Số đo: OD: -2.25 Cyl -0.50 Axis 180 | OS: -1.75 Cyl -0.25 Axis 175 | PD 63mm
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0 text-right">
                  <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-lg">
                    Bảo hành gọng Bolon: Còn 350 ngày
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    Bảo hiểm độ khúc xạ: Còn 170 ngày
                  </span>
                </div>
              </div>
            </div>

            {/* BƯỚC 2: Chọn loại yêu cầu & nguyên nhân sự cố */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-black text-sm text-slate-900">
                  Chọn loại yêu cầu & nguyên nhân sự cố
                </h3>
              </div>

              {/* 4 Cards Radio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 1. Bảo hiểm độ khúc xạ 180 ngày */}
                <div
                  onClick={() => setClaimType('RX_INSURANCE')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${claimType === 'RX_INSURANCE'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={claimType === 'RX_INSURANCE'} readOnly className="text-[#074768]" />
                    <span className="font-black text-xs">Bảo hiểm độ khúc xạ 180 ngày</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed">
                    Đau mắt, nhức đầu chóng mặt, chưa thích nghi với độ mới, muốn tái khám và đổi cặp tròng mới hoàn toàn miễn phí.
                  </p>
                  <span className="text-[10px] font-bold text-emerald-700 block mt-2 pl-5">
                    ✓ Miễn phí 100%, áp dụng 1 lần
                  </span>
                </div>

                {/* 2. Bảo hành kỹ thuật gọng */}
                <div
                  onClick={() => setClaimType('FRAME_TECH')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${claimType === 'FRAME_TECH'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={claimType === 'FRAME_TECH'} readOnly className="text-[#074768]" />
                    <span className="font-black text-xs">Bảo hành kỹ thuật gọng kính</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed">
                    Lỏng ốc bản lề, bung ve mũi đệm silicon, cong vênh càng kính hoặc gãy mối hàn do lỗi nhà sản xuất.
                  </p>
                  <span className="text-[10px] font-bold text-[#0284c7] block mt-2 pl-5">
                    ✓ Sẵn phụ kiện chính hãng
                  </span>
                </div>

                {/* 3. Bảo hành tròng kính */}
                <div
                  onClick={() => setClaimType('LENS_WARRANTY')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${claimType === 'LENS_WARRANTY'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={claimType === 'LENS_WARRANTY'} readOnly className="text-[#074768]" />
                    <span className="font-black text-xs">Bảo hành tròng kính</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed">
                    Trầy xước lớp dầu khử quang quang học tự nhiên, phát hiện đốm bọt khí quang học trong tròng màng chống bám hơi nước.
                  </p>
                  <span className="text-[10px] font-bold text-[#0284c7] block mt-2 pl-5">
                    ✓ Bảo hiểm váng Essilor/Zeiss
                  </span>
                </div>

                {/* 4. Đổi mẫu / Đổi size */}
                <div
                  onClick={() => setClaimType('EXCHANGE_7D')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${claimType === 'EXCHANGE_7D'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768] shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={claimType === 'EXCHANGE_7D'} readOnly className="text-[#074768]" />
                    <span className="font-black text-xs">Đổi mẫu / Đổi size trong 07 ngày</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed">
                    Sản phẩm chưa vừa vặn với tỷ lệ góc mặt, cầu mũi quá chật/rộng hoặc muốn đổi sang mẫu gọng thời trang khác.
                  </p>
                  <span className="text-[10px] font-bold text-amber-700 block mt-2 pl-5">
                    ✓ Hạn đổi đến 19/03/2026
                  </span>
                </div>
              </div>

              {/* Textarea */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mô tả chi tiết sự cố quang học / yêu cầu xử lý:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#074768] focus:bg-white"
                />
              </div>
            </div>

            {/* BƯỚC 3: Tải ảnh chụp thực tế */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-black text-sm text-slate-900">
                    Tải ảnh chụp thực tế sản phẩm bị lỗi / Đơn đo mắt
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400">Tối đa đính kèm 3 ảnh</span>
              </div>

              <div className="p-6 border-2 border-dashed border-sky-300 rounded-2xl bg-sky-50/40 text-center space-y-2">
                <Upload className="w-8 h-8 text-[#0284c7] mx-auto stroke-1" />
                <div className="text-xs font-bold text-slate-700">Kéo thả hình ảnh hoặc Duyệt từ máy</div>
                <p className="text-[10px] text-slate-400">
                  Vui lòng chụp cận cảnh tròng kính nghiêng dưới ánh sáng để phản chiếu lớp váng, hoặc chụp góc bản lề/càng kính bị xô lệch.
                </p>
              </div>

              {/* Previews */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {uploadedPhotos.map((photo, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={photo.url} alt="Proof" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <span className="truncate text-[11px] font-medium text-slate-700">{photo.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BƯỚC 4: Phương thức tiếp nhận */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#074768] text-white font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="font-black text-sm text-slate-900">
                  Phương thức tiếp nhận & bàn giao kính
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Mang trực tiếp tới Showroom */}
                <div
                  onClick={() => setDeliveryMethod('SHOWROOM')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${deliveryMethod === 'SHOWROOM'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768]'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={deliveryMethod === 'SHOWROOM'} readOnly className="text-[#074768]" />
                    <span className="font-bold text-xs">Mang trực tiếp tới Showroom</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed font-normal">
                    Chuyên viên khúc xạ đo khám ngay tại chỗ & kiểm tra và xử lý kỹ thuật nếu cần chỉnh form trong 20 phút.
                  </p>
                  <div className="mt-3 pl-5">
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 outline-none"
                    >
                      <option value="Q1">Flagship 88 Lê Thánh Tôn, Bến Nghé, Quận 1 (TP.HCM)</option>
                      <option value="HK">Showroom 24 Tràng Tiền, Hoàn Kiếm (Hà Nội)</option>
                      <option value="HC">Showroom 102 Nguyễn Văn Linh, Hải Châu (Đà Nẵng)</option>
                    </select>
                  </div>
                </div>

                {/* Gửi bưu điện 2 chiều */}
                <div
                  onClick={() => setDeliveryMethod('DOOR')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${deliveryMethod === 'DOOR'
                      ? 'border-[#074768] bg-[#f0f9ff] text-[#074768]'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={deliveryMethod === 'DOOR'} readOnly className="text-[#074768]" />
                    <span className="font-bold text-xs">Gửi bưu điện 2 chiều tận nhà</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed font-normal">
                    Shipper tới nhà nhận nguyên hộp hoàn toàn miễn phí. Sau khi hoàn tất kỹ thuật sẽ giao trả tận tay.
                  </p>
                  <div className="mt-3 pl-5 p-2 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-600">
                    <strong>Địa chỉ tiếp nhận:</strong> Tầng 14 Vincom Center, 72 Lê Thánh Tôn, Q.1 (SĐT: 0918 732 998)
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('policy')}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                ← Xem Lại Chính Sách Bảo Hành
              </button>

              <button
                type="submit"
                className="bg-[#074768] hover:bg-[#09577f] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-sm active:scale-95 flex items-center gap-2"
              >
                <span>Gửi Yêu Cầu Hậu Mãi Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right: Đặc Quyền Khách Hàng & Quy Trình 4 Bước */}
        <div className="lg:col-span-4 space-y-6">
          {/* Đặc Quyền Khách Hàng */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              ĐẶC QUYỀN KHÁCH HÀNG
            </span>
            <h4 className="font-black text-sm text-slate-900">OPTIVISION CARE+ VIP</h4>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-xs">Bảo hiểm độ 180 ngày 100%</strong>
                  <span className="text-[11px] text-slate-500 leading-relaxed block">
                    Được tài trợ đổi sang tròng mới hoàn toàn miễn phí nếu bạn cảm thấy mỏi mắt hoặc mắt có sự thay đổi độ cận.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-xs">Đổi mẫu trong 07 ngày</strong>
                  <span className="text-[11px] text-slate-500 leading-relaxed block">
                    Thoải mái thử và đổi sang kiểu dáng gọng kính khác nếu chưa hoàn toàn ưng ý thẩm mỹ độ quy chuẩn đã đo.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-xs">Vệ sinh siêu âm trọn đời</strong>
                  <span className="text-[11px] text-slate-500 leading-relaxed block">
                    Miễn phí thay đệm mũi silicon y tế định kỳ, nắn chỉnh gọng cong vênh và làm sạch sâu tại mọi showroom.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-xs">Bảo hành vận chuyển 0đ</strong>
                  <span className="text-[11px] text-slate-500 leading-relaxed block">
                    Miễn phí 100% cước gửi bưu tá 2 chiều cho mọi yêu cầu bảo hành trên toàn quốc.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quy Trình Xử Lý Nhanh */}
          <div className="bg-gradient-to-br from-[#063c59] to-[#09547d] text-white p-6 rounded-3xl shadow-md space-y-4 text-xs">
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
              QUY TRÌNH XỬ LÝ NHANH
            </span>
            <h4 className="font-bold text-sm text-white">4 Bước Tiếp Nhận & Khắc Phục</h4>

            <div className="space-y-2.5 text-[11px] text-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                <span>Tiếp nhận và duyệt tự động trong 2 giờ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                <span>Kỹ thuật viên phòng mài kiểm tra mẫu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                <span>Kiểm định quang học & Đổi tròng mới chuẩn tâm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">4</span>
                <span>Giao trả kính trong ngày trên toàn quốc</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20">
              <span className="text-[10px] text-sky-200 block font-semibold">TỔNG ĐÀI GIẢI QUYẾT SỰ CỐ:</span>
              <span className="text-lg font-black text-white">1900 6868 (Phím 2)</span>
            </div>
          </div>

          {/* Tiêu Chuẩn Phòng Đo Khúc Xạ */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              TIÊU CHUẨN PHÒNG ĐO KHÚC XẠ
            </span>
            <img
              src="https://images.unsplash.com/photo-1582142839970-2b9da988941f?w=500"
              alt="Phòng đo"
              className="w-full h-32 object-cover rounded-2xl"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ✓ Máy đo khúc xạ tự động 3D • Phòng vô trùng cắt kính tiêu chuẩn ISO 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

