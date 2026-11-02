import React from 'react';
import { Eye, Phone, ShieldCheck, MapPin, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] text-slate-600 border-t border-slate-200 mt-auto">
      {/* 4 Main Columns */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs leading-relaxed">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#074768] text-white flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#97d7ff]" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#074768]">
              Opti<span className="text-[#0284c7]">Vision</span>
            </span>
          </div>
          <p className="text-slate-500">
            Hệ sinh thái khúc xạ & phân phối kính mắt cao cấp kết hợp quy chuẩn lâm sàng và phong cách thời trang đương đại.
          </p>
          <div className="pt-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Phone className="w-4 h-4 text-[#074768]" />
              <span>Hotline CSKH: 1900 6868</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Thời gian hỗ trợ: 08:30 - 21:30 (Cả Thứ 7 & CN)</p>
          </div>
        </div>

        {/* Col 2: Policy & Support */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3">Chính Sách & Hỗ Trợ</h4>
          <ul className="space-y-2 text-slate-500">
            <li className="hover:text-[#074768] cursor-pointer transition">Chính sách bảo hành tròng & gọng kính</li>
            <li className="hover:text-[#074768] cursor-pointer transition">Bảo hiểm độ khúc xạ 6 tháng</li>
            <li className="hover:text-[#074768] cursor-pointer transition">Đổi mới trong 7 ngày nếu không êm mắt</li>
            <li className="hover:text-[#074768] cursor-pointer transition">Chính sách vệ sinh, căn chỉnh trọn đời</li>
            <li className="hover:text-[#074768] cursor-pointer transition">Hướng dẫn đo khoảng cách đồng tử (PD)</li>
          </ul>
        </div>

        {/* Col 3: Showroom Network */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3">Hệ Thống Chi Nhánh</h4>
          <div className="space-y-2.5 text-slate-500">
            <div>
              <p className="font-semibold text-slate-800">Flagship Quận 1:</p>
              <p>88 Lê Thánh Tôn, Bến Nghé, TP.HCM</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Chi nhánh Hoàn Kiếm:</p>
              <p>24 Tràng Tiền, Hoàn Kiếm, Hà Nội</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Chi nhánh Hải Châu:</p>
              <p>102 Nguyễn Văn Linh, Đà Nẵng</p>
            </div>
          </div>
        </div>

        {/* Col 4: Clinical Eyecare Service */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3">Dịch Vụ Đo Khám</h4>
          <p className="text-slate-500 mb-3">
            Quy trình đo khúc xạ 12 bước tiêu chuẩn quốc tế với hệ thống máy khúc xạ kế tự động kỹ thuật số.
          </p>
          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="text-[11px] font-bold text-[#074768] uppercase">Thời gian phục vụ</div>
            <div className="font-semibold text-slate-800 text-xs">08:30 - 21:30 (Cả Thứ 7 & Chủ Nhật)</div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Khám miễn phí
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-slate-200/80 py-4 px-4 text-center text-[11px] text-slate-400">
        <p>© 2026 OptiVision Eyewear Platform. Chuẩn lâm sàng - Thấu thị tinh hoa. Hotline 1900 6868.</p>
      </div>
    </footer>
  );
}

