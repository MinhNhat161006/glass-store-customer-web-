import React, { useState } from 'react';
import { 
  ShoppingBag, Clock, CheckCircle2, Wrench, Package, 
  Truck, Eye, Download, Calendar, ArrowRight, ChevronRight, FileText, ShieldCheck 
} from 'lucide-react';

export default function OrdersPage({ setActiveTab }) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const orders = [
    {
      id: 'ORD-2026-8924',
      orderDate: '18/10/2026 10:30',
      branch: 'Flagship 88 Lê Thánh Tôn, Quận 1 (TP.HCM)',
      status: 'PROCESSING', // PROCESSING, READY, COMPLETED
      statusLabel: 'Đang mài lắp tại phòng Lab',
      estimatedTime: 'Hôm nay, 17:30 (18/10/2026)',
      items: [
        {
          name: 'Kính Gọng Cận Nữ Titanium Bolon Graceful BJ3120 – Rose Gold Edition',
          sku: 'BOLON-BJ3120-B10',
          image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=300&q=80',
          price: 5330000,
          qty: 1,
          lens: 'Essilor Crizal Sapphire HR 1.67 (Pháp) (+1.450.000 đ)',
          prescription: 'OD: -2.25 D (175°) | OS: -2.00 D (180°) | PD: 63.5 mm'
        }
      ],
      totalAmount: 6780000,
      paymentMethod: 'Chuyển khoản VietQR (Đã thanh toán)',
      step: 3 // 1: Đặt hàng, 2: Duyệt toa, 3: Mài lắp Lab, 4: Kiểm định QC, 5: Sẵn sàng nhận
    },
    {
      id: 'ORD-2026-7731',
      orderDate: '05/09/2026 14:15',
      branch: 'Showroom 24 Tràng Tiền, Hoàn Kiếm (Hà Nội)',
      status: 'COMPLETED',
      statusLabel: 'Đã hoàn tất & bàn giao',
      estimatedTime: 'Đã nhận lúc 16:45 ngày 05/09/2026',
      items: [
        {
          name: 'Kính Râm Ray-Ban Classic Wayfarer Polarized',
          sku: 'SUN-RB-WAYF-BLK',
          image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
          price: 4950000,
          qty: 1,
          lens: 'Tròng phân cực Polarized chống lóa nguyên bản',
          prescription: 'Kính mát thời trang không độ'
        }
      ],
      totalAmount: 4950000,
      paymentMethod: 'Thẻ tín dụng Visa/MasterCard',
      step: 5
    }
  ];

  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Breadcrumb & Title */}
      <div>
        <nav className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
          <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
            Trang Chủ
          </span>
          <span>/</span>
          <span className="text-[#074768] font-bold">Quản Lý Đơn Hàng & Tiến Trình Kính</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Đơn Hàng Của Bạn
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo dõi trực tiếp từng bước gia công mài lắp tự động và kiểm định chất lượng kính quang học.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className="bg-[#074768] hover:bg-[#09577f] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4 text-sky-300" />
            <span>Mua sắm thêm</span>
          </button>
        </div>
      </div>

      {/* 2. Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        {[
          { id: 'ALL', label: `Tất cả (${orders.length})` },
          { id: 'PROCESSING', label: 'Đang gia công mài lắp (1)' },
          { id: 'COMPLETED', label: 'Đã hoàn tất (1)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-4 py-2 rounded-xl transition ${
              filterStatus === tab.id
                ? 'bg-[#074768] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-[#074768]">
                    #{order.id}
                  </span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    order.status === 'PROCESSING'
                      ? 'bg-sky-100 text-[#0369a1] border border-sky-200 animate-pulse'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {order.statusLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Ngày đặt: {order.orderDate} • Chi nhánh: {order.branch}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">Tổng thanh toán:</span>
                <span className="text-lg font-black text-slate-900">
                  {formatPrice(order.totalAmount)}
                </span>
                <span className="text-[10px] text-slate-500 block">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Stepper Progress 5 Steps */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
                TIẾN TRÌNH XỬ LÝ QUANG HỌC:
              </span>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { step: 1, label: '1. Đặt hàng' },
                  { step: 2, label: '2. Duyệt toa' },
                  { step: 3, label: '3. Mài lắp Lab' },
                  { step: 4, label: '4. Kiểm định QC' },
                  { step: 5, label: '5. Sẵn sàng nhận' },
                ].map((s) => {
                  const isDone = s.step < order.step;
                  const isCurrent = s.step === order.step;
                  return (
                    <div key={s.step} className="flex flex-col items-center space-y-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isDone 
                          ? 'bg-emerald-600 text-white' 
                          : isCurrent 
                          ? 'bg-[#074768] text-white ring-4 ring-sky-200 animate-pulse' 
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                      </div>
                      <span className={`text-[10px] truncate max-w-[80px] sm:max-w-none ${
                        isCurrent ? 'font-bold text-[#074768]' : isDone ? 'text-slate-800 font-semibold' : 'text-slate-400'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5 border-t border-slate-200/60">
                <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Thời gian dự kiến: <strong>{order.estimatedTime}</strong></span>
              </div>
            </div>

            {/* Products inside order */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{item.sku}</span>
                      <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                      {item.lens && (
                        <p className="text-[11px] text-[#0369a1] font-semibold mt-0.5">
                          Tròng kính: {item.lens}
                        </p>
                      )}
                      {item.prescription && (
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                          Số đo cắt mài: {item.prescription}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right self-end sm:self-center shrink-0">
                    <div className="text-xs font-black text-[#074768]">
                      {formatPrice(item.price)}
                    </div>
                    <div className="text-[10px] text-slate-400">Số lượng: {item.qty}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Bảo hành chính hãng 12 tháng tại toàn bộ 16 chi nhánh
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => alert(`Đang tải hóa đơn điện tử VAT cho đơn hàng #${order.id}...`)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Hóa đơn điện tử</span>
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className="bg-[#074768] hover:bg-[#09577f] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Yêu cầu hỗ trợ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

