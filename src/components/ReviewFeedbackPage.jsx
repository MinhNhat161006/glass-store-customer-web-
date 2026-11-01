import React, { useState } from 'react';
import {
  Star, CheckCircle2, ShieldCheck, Camera, Upload,
  X, ArrowRight, Heart, Sparkles, AlertCircle, Phone, FileText, Check
} from 'lucide-react';

export default function ReviewFeedbackPage({ setActiveTab }) {
  // Rating states (1-5)
  const [frameComfort, setFrameComfort] = useState(5);
  const [lensClarity, setLensClarity] = useState(5);
  const [staffService, setStaffService] = useState(5);

  // Quick feedback tags
  const [selectedTags, setSelectedTags] = useState(['Gọng siêu nhẹ', 'Đo mắt cực chuẩn']);

  // Comment & attachments
  const [comment, setComment] = useState(
    'Gọng titan đeo rất nhẹ, tròng Essilor chống chói đêm xe ban đêm cực tốt, KTV chỉnh càng kính vừa khít với khuôn mặt mình...'
  );
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80',
  ]);
  const [agreed, setAgreed] = useState(true);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🎉 CẢM ƠN QUÝ KHÁCH ĐÃ ĐÁNH GIÁ!\n\nBạn đã nhận được +500 Điểm VIP Loyalty và Mã Voucher 50.000đ gửi về SMS. Ý kiến quý báu của bạn giúp OptiVision không ngừng nâng cao chất lượng lâm sàng!');
    setActiveTab('orders');
  };

  const renderStars = (rating, setRating) => (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="p-1 focus:outline-none transition hover:scale-110"
        >
          <Star
            className={`w-5 h-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
          />
        </button>
      ))}
      <span className="text-xs font-bold text-slate-700 ml-2">{rating}/5 Sao</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner (Ảnh 1 chuẩn xác) */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-3xl border border-sky-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#074768] text-white mb-2">
            HỆ THỐNG PHẢN HỒI LÂM SÀNG & SẢN PHẨM • FR-APP-12 & FR-CRM-07
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Đánh Giá Trải Nghiệm Mắt Kính & Dịch Vụ Khúc Xạ
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Ý kiến của bạn giúp OptiVision không ngừng nâng tầm chuẩn mực quang học và phụng sự khách hàng tốt hơn.
          </p>
        </div>

        {/* Reward Pill */}
        <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-sm flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Thưởng hoàn tất đánh giá:</span>
            <span className="text-xs font-black text-[#074768] block">+500 Điểm VIP / Voucher 50.000đ</span>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Columns Body (Ảnh 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Thông tin đơn hàng & Số đo khúc xạ đã cắt kính */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Đơn Hàng */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono font-bold text-xs text-[#074768]">
                ĐƠN HÀNG #OPT-8842-SG
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Đã giao ngày 12/03/2026
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=200&q=80"
                alt="Bolon Graceful"
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase">Gọng kính chính hãng</span>
                <h4 className="font-bold text-xs text-slate-900 mt-0.5">Bolon Graceful BJ3120 Rose Gold</h4>
                <p className="text-[11px] text-slate-500">Tròng Essilor Crizal Sapphire HR 1.67 (Pháp)</p>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                  ✓ Bảo hành tròng 12T • Căn chỉnh trọn đời
                </span>
              </div>
            </div>

            {/* Thông số khúc xạ thực tế khách hàng */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-bold text-slate-800 text-[11px]">Thông Số Khúc Xạ Thực Tế Khách Hàng</span>
                <span className="text-[10px] text-slate-500">KTV: Hoàng Nhật Minh (OP-09)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-[#074768] mb-1">Mắt Phải (OD):</div>
                  <div className="text-slate-600">Độ cầu (SPH): <strong>-2.25 D</strong></div>
                  <div className="text-slate-600">Độ loạn (CYL): <strong>0.00 D</strong></div>
                  <div className="text-slate-600">Trục (AXIS): <strong>-</strong></div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-[#074768] mb-1">Mắt Trái (OS):</div>
                  <div className="text-slate-600">Độ cầu (SPH): <strong>-1.75 D</strong></div>
                  <div className="text-slate-600">Độ loạn (CYL): <strong>0.00 D</strong></div>
                  <div className="text-slate-600">Trục (AXIS): <strong>-</strong></div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>Khoảng cách đồng tử (PD): <strong>63 mm</strong></span>
                <span>Độ cao tâm quang (PH): <strong>21 mm</strong></span>
              </div>
            </div>

            {/* Khối Cam Kết Quang Học 180 Ngày */}
            <div className="p-4 rounded-2xl bg-[#063c59] text-white space-y-2">
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
                CAM KẾT QUANG HỌC 180 NGÀY
              </span>
              <h5 className="font-bold text-xs text-white">Bảo Hiểm Thích Nghi Khúc Xạ Miễn Phí</h5>
              <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
                Nếu bạn cảm thấy mỏi mắt hoặc độ kính chưa quen trong 180 ngày đầu, OptiVision cam kết kiểm tra thị lực và đổi tròng mới 100% miễn phí.
              </p>
              <div className="flex gap-4 pt-1 text-[11px] text-sky-200 font-semibold">
                <span>✓ Đo khám chuyên sâu</span>
                <span>✓ Đổi chiết quang 0đ</span>
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-slate-600 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
              <div className="text-[11px]">
                <strong>Cần chuyên viên căn chỉnh lại gọng ngay?</strong> Mang kính đến bất kỳ chi nhánh OptiVision nào để được vệ sinh sóng siêu âm & chỉnh ve mũi tức thì.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Đánh Giá Thực Tế (Ảnh 1 chuẩn xác) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-lg text-slate-900">Biểu Mẫu Đánh Giá Thực Tế</h3>
              <p className="text-xs text-slate-500">Minh bạch • Đo lường theo tiêu chuẩn lâm sàng khúc xạ</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Đang xác thực bảo mật người mua
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 3 Rating Criteria Boxes */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                CHẤM ĐIỂM ĐA TIÊU CHÍ KÍNH MẮT
              </span>

              {/* Criterion 1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">1. Độ êm ái & Vừa vặn của gọng kính</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Không cấn vành tai, đệm mũi êm ái, trọng lượng nhẹ nhàng</p>
                </div>
                {renderStars(frameComfort, setFrameComfort)}
              </div>

              {/* Criterion 2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">2. Độ trong trẻo & Thích nghi của tròng kính</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Tầm nhìn sắc nét, giảm chói ánh sáng xanh tốt, không mỏi mắt</p>
                </div>
                {renderStars(lensClarity, setLensClarity)}
              </div>

              {/* Criterion 3 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">3. Thái độ phục vụ & Tư vấn của chuyên viên</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">KTV đo mắt tận tâm 12 bước, căn chỉnh gọng chu đáo tỉ mỉ</p>
                </div>
                {renderStars(staffService, setStaffService)}
              </div>
            </div>

            {/* Quick tags */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Chọn nhanh cảm nhận thực tế:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Tròng trong suốt',
                  'Gọng siêu nhẹ',
                  'Đo mắt cực chuẩn',
                  'Giao hàng nhanh',
                  'Đóng gói cẩn thận',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition ${selectedTags.includes(tag)
                        ? 'bg-[#074768] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                  >
                    {selectedTags.includes(tag) ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail comment */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-bold text-slate-700">Nội dung nhận xét chi tiết:</label>
                <span className="text-slate-400">{comment.length} / 1000 ký tự</span>
              </div>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-2xl p-3 outline-none focus:border-[#074768] focus:bg-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Khuyến khích nhận xét chi tiết về độ thích nghi thị lực để bác sĩ khúc xạ theo dõi hồ sơ của bạn.
              </p>
            </div>

            {/* Images upload box */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-700">Hình ảnh & Video thực tế khi đeo kính:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                  +Voucher 50.000đ
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={img} alt="Feedback preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => alert('Chọn ảnh đeo kính thực tế từ thiết bị của bạn...')}
                  className="w-20 h-20 rounded-2xl border-2 border-dashed border-sky-300 hover:border-[#074768] bg-sky-50/50 flex flex-col items-center justify-center gap-1 text-[#074768] text-xs font-bold transition"
                >
                  <Camera className="w-5 h-5 text-[#0284c7]" />
                  <span className="text-[10px]">Thêm ảnh</span>
                </button>
              </div>
            </div>

            {/* Checkbox agreement */}
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-[#074768] mt-0.5"
              />
              <span>
                Tôi xác nhận đây là trải nghiệm thực tế sau khi sử dụng gọng Bolon và tròng Essilor theo đúng số độ khám tại OptiVision. Cho phép hiển thị huy hiệu <strong>"Đã Khám Khúc Xạ Thực Tế"</strong> trên bài đánh giá.
              </span>
            </label>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                ← Quay lại danh sách đơn hàng
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Đã lưu nháp đánh giá vào hồ sơ!')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Lưu Nháp
                </button>
                <button
                  type="submit"
                  className="bg-[#074768] hover:bg-[#09577f] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <span>Gửi Đánh Giá Ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Community Reviews Section (Chân trang - Ảnh 1) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block">
              CỘNG ĐỒNG KHÁCH HÀNG THỰC TẾ
            </span>
            <h3 className="text-base font-black text-slate-900 mt-0.5">
              Đánh Giá Về Bolon BJ3120 & Tròng Kính Essilor
            </h3>
            <p className="text-xs text-slate-500">Tổng hợp nhận xét khách quan từ 128 khách hàng đã đo khám và nhận kính hoàn thiện.</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
            <span className="text-2xl font-black text-slate-900">4.9</span>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">128 lượt phản hồi • 100% Khách Hài Lòng</span>
            </div>
          </div>
        </div>

        {/* 3 Sample Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {[
            {
              author: 'Trần Hương Giang',
              branch: 'Chi nhánh Quận 1, TP.HCM',
              comment: 'Gọng Bolon màu Rose Gold sáng da cực kỳ. Tròng Essilor Sapphire này ban đầu mình sợ dày vì cận -3.50, nhưng chiết suất 1.67 mài cạnh bóng lắp vào nhìn rất thẩm mỹ. Chạy xe buổi tối đèn pha ô tô không hề bị lóa.',
              date: '28/02/2026',
            },
            {
              author: 'Đặng Quốc Khang',
              branch: 'Chi nhánh Hoàn Kiếm, HN',
              comment: 'KTV đo mắt cực kỳ kiên nhẫn. Mình bị lệch độ 2 mắt và loạn nhẹ, đo kiểm tra thị lực hai mắt mất 35 phút rất chuẩn. Ve đệm mũi chỉnh khít sống mũi, cúi xuống làm việc không bị tuột. Rất hài lòng chính sách 180 ngày!',
              date: '04/03/2026',
            },
            {
              author: 'Mai Anh Thư',
              branch: 'Chi nhánh Hải Châu, ĐN',
              comment: 'Lần đầu tiên đặt kính kết hợp đo tại store mà giao tận nhà đúng giờ và chuẩn từng milimet khoảng cách đồng tử. Hộp phụ kiện da sang xịn mịn, có kèm thẻ bảo hành tròng Essilor check QR chính hãng yên tâm 100%.',
              date: '09/03/2026',
            },
          ].map((rev, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900">{rev.author}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] text-[#074768] font-bold bg-sky-100 px-2 py-0.5 rounded-full">
                    ✓ Đã Mua Hàng
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ Đã Khám Khúc Xạ
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px] italic">
                  "{rev.comment}"
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 flex justify-between">
                <span>{rev.branch}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

