import React, { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { 
  Search, SlidersHorizontal, Grid, List, Check, ArrowRight, 
  ChevronDown, ShieldCheck, X 
} from 'lucide-react';

export default function ProductCatalogPage({ onAddToCart, setActiveTab, onViewDetail }) {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedShapes, setSelectedShapes] = useState(['RECTANGLE']);
  const [selectedMaterials, setSelectedMaterials] = useState(['TITANIUM']);
  const [priceRange, setPriceRange] = useState('1M_2.5M');
  const [selectedShowroom, setSelectedShowroom] = useState(['Q1']);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('NEWEST');
  const [realProducts, setRealProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAllProducts();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p, idx) => {
            const v = (p.variants && p.variants.length > 0) ? p.variants[0] : null;
            return {
              id: p.id,
              sku: v ? v.sku : ('SKU-00' + p.id),
              name: p.name,
              specs: 'Tiêu chuẩn quốc tế ISO 13666',
              category: p.productType || 'FRAME',
              shape: (v && v.frameShape) ? v.frameShape.toUpperCase() : 'RECTANGLE',
              material: (v && v.material) ? v.material.toUpperCase() : 'TITANIUM',
              colors: ['#1e293b', '#64748b', '#0369a1'],
              description: p.description,
              price: v ? Number(v.price) : 2500000,
              image: (v && v.imageUrl) ? v.imageUrl : 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
            };
          });
          setRealProducts(mapped);
        }
      } catch (err) {
        console.warn('Real catalog fetch notice:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProducts();
  }, []);

  // Products Dataset khớp 100% Ảnh 3
  const allProducts = [
    {
      id: 1,
      sku: 'OPTI-TITAN-08',
      name: 'Aurea Minimalist Pure Titanium',
      specs: '52-18-145mm',
      category: 'FRAME',
      shape: 'RECTANGLE',
      material: 'TITANIUM',
      colors: ['#1e293b', '#64748b', '#0369a1'],
      description: 'Titanium siêu nhẹ 8.2g, chống ăn mòn tuyệt đối, thiết kế tinh giản công sở.',
      price: 2450000,
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      sku: 'OPTI-ACE-12',
      name: 'Classic Havana Acetate Masterpiece',
      specs: '49-20-142mm',
      category: 'FRAME',
      shape: 'ROUND',
      material: 'ACETATE',
      colors: ['#78350f', '#451a03', '#0f172a'],
      description: 'Acetate Ý nguyên tấm gọt thủ công, bản lề 5 chấu siêu bền phong cách retro.',
      price: 1890000,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      sku: 'OPTI-TITAN-02',
      name: 'Ultra-light Pure Rimless Titan',
      specs: '51-17-140mm',
      category: 'FRAME',
      shape: 'RECTANGLE',
      material: 'TITANIUM',
      colors: ['#cbd5e1', '#94a3b8'],
      description: 'Gọng khoan bắt ốc không viền thanh lịch, trọng lượng chỉ 6.5g không hằn sống mũi.',
      price: 2850000,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      sku: 'OPTI-GEO-04',
      name: 'Octagon Prism Pure Alloy',
      specs: '50-19-145mm',
      category: 'FRAME',
      shape: 'GEOMETRIC',
      material: 'ALLOY',
      colors: ['#ca8a04', '#1e293b', '#854d0e'],
      description: 'Hợp kim siêu bền, đệm mũi bọc silicon y tế chống trượt tạo dáng bát giác cá tính.',
      price: 1750000,
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      sku: 'OPTI-TR90-19',
      name: 'Kinetics Ergonomic Flexible TR90',
      specs: '54-16-148mm',
      category: 'FRAME',
      shape: 'RECTANGLE',
      material: 'TR90',
      colors: ['#0f172a', '#334155'],
      description: 'Vật liệu polymer Thụy Sĩ uốn dẻo 180 độ không gãy, thích hợp thể thao năng động.',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      sku: 'OPTI-ACE-33',
      name: 'Lumina Crystal Clear Acetate',
      specs: '48-21-145mm',
      category: 'FRAME',
      shape: 'ROUND',
      material: 'ACETATE',
      colors: ['#e2e8f0', '#fef3c7'],
      description: 'Lõi kim loại chạm khắc laser tinh tế bên trong gọng trong suốt bắt sáng đỉnh cao.',
      price: 2100000,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 7,
      sku: 'OPTI-AVI-07',
      name: 'Aero Navigator Dual-Bridge Pilot',
      specs: '55-15-145mm',
      category: 'SUN',
      shape: 'AVIATOR',
      material: 'ALLOY',
      colors: ['#eab308', '#94a3b8'],
      description: 'Cầu kính kép đương đại, thép không gỉ mạ PVD công nghệ đồng hồ Thụy Sĩ.',
      price: 2350000,
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      sku: 'LENS-DIGI-167',
      name: 'OptiFreeform Digital Rx Lens 1.67',
      specs: 'Chiết suất: 1.67 | BlueCut UV420',
      category: 'LENS',
      shape: 'LENS',
      material: 'LENS',
      colors: ['#38bdf8'],
      description: 'Tròng mỏng quang sai thấp, phủ lớp váng Nano chống trầy, lọc ánh sáng xanh máy tính.',
      price: 1950000,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const toggleShape = (shape) => {
    if (selectedShapes.includes(shape)) {
      setSelectedShapes(selectedShapes.filter((s) => s !== shape));
    } else {
      setSelectedShapes([...selectedShapes, shape]);
    }
  };

  const toggleMaterial = (mat) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedShapes([]);
    setSelectedMaterials([]);
    setPriceRange('ALL');
    setSelectedShowroom(['Q1']);
    setSearchKeyword('');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* 1. Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5">
        <span onClick={() => setActiveTab('home')} className="hover:text-[#074768] cursor-pointer">
          Trang Chủ
        </span>
        <span>/</span>
        <span className="text-[#074768] font-bold">Danh Mục Sản Phẩm</span>
      </nav>

      {/* 2. Page Header Banner (Ảnh 3) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bộ Sưu Tập Mắt Kính & Tròng Kính Khúc Xạ
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Thiết kế quang học chuẩn y khoa, kết hợp vật liệu titanium siêu nhẹ và acetate chế tác thủ công tinh xảo.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
          <span>Đạt chứng nhận khúc xạ CE & ISO 12870</span>
        </div>
      </div>

      {/* 3. Search Bar & Controls Bar (Ảnh 3) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo tên gọng, mã SKU hoặc chất liệu..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#074768] focus:bg-white transition"
          />
        </div>

        {/* Counter & Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          <span className="text-slate-400 text-xs hidden sm:inline">
            Hiển thị <strong>{allProducts.length}</strong> sản phẩm
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="NEWEST">Sắp xếp: Mới nhất</option>
            <option value="PRICE_ASC">Giá: Thấp đến Cao</option>
            <option value="PRICE_DESC">Giá: Cao đến Thấp</option>
            <option value="POPULAR">Bán chạy nhất</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-slate-500">
            <button className="p-1 rounded-lg bg-white text-[#074768] shadow-xs">
              <Grid className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-lg hover:text-slate-900">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Active Filters Badges Bar (Ảnh 3) */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 text-[11px] font-semibold">Đang lọc:</span>
        <span className="bg-sky-50 text-[#0369a1] border border-sky-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
          Kiểu: Chữ nhật
          <X className="w-3 h-3 cursor-pointer" />
        </span>
        <span className="bg-sky-50 text-[#0369a1] border border-sky-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
          Chất liệu: Titanium
          <X className="w-3 h-3 cursor-pointer" />
        </span>
        <span className="bg-sky-50 text-[#0369a1] border border-sky-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
          1.000.000 đ - 2.500.000 đ
          <X className="w-3 h-3 cursor-pointer" />
        </span>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-red-500 underline ml-2 transition"
        >
          Xóa tất cả
        </button>
      </div>

      {/* 5. Main 2-Columns Body: Sidebar Filter (Left) + Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Ảnh 3) */}
        <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#074768]" />
              Bộ Lọc Chi Tiết
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-[#074768] font-semibold"
            >
              Đặt lại
            </button>
          </div>

          {/* Group 1: Danh Mục */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              DANH MỤC
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'ALL', label: 'Tất cả sản phẩm', count: 86 },
                { id: 'FRAME', label: 'Gọng kính cận', count: 48 },
                { id: 'SUN', label: 'Kính râm phân cực', count: 22 },
                { id: 'LENS', label: 'Tròng kính khúc xạ', count: 10 },
                { id: 'ACCESSORY', label: 'Phụ kiện quang học', count: 6 },
              ].map((cat) => (
                <label
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition ${
                    selectedCategory === cat.id
                      ? 'bg-sky-50 font-bold text-[#0369a1]'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedCategory === cat.id ? 'border-[#0284c7] bg-[#0284c7]' : 'border-slate-300'}`}>
                      {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </span>
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 2: Kiểu Dáng Gọng */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              KIỂU DÁNG GỌNG
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'RECTANGLE', label: 'Chữ nhật (Rectangle)' },
                { id: 'ROUND', label: 'Tròn cổ điển (Round)' },
                { id: 'GEOMETRIC', label: 'Đa giác (Geometric)' },
                { id: 'AVIATOR', label: 'Phi công (Aviator)' },
                { id: 'CAT_EYE', label: 'Mắt mèo (Cat-eye)' },
              ].map((s) => (
                <label
                  key={s.id}
                  onClick={() => toggleShape(s.id)}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={selectedShapes.includes(s.id)}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#074768] focus:ring-0"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 3: Chất Liệu Chế Tác */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              CHẤT LIỆU CHẾ TÁC
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'TITANIUM', label: 'Titanium siêu nhẹ (Beta-Ti)' },
                { id: 'ACETATE', label: 'Acetate Ý nguyên khối' },
                { id: 'TR90', label: 'Nhựa Thụy Sĩ TR90' },
                { id: 'ALLOY', label: 'Thép không gỉ y khoa' },
              ].map((m) => (
                <label
                  key={m.id}
                  onClick={() => toggleMaterial(m.id)}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(m.id)}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#074768] focus:ring-0"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 4: Mức Giá */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              MỨC GIÁ
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'UNDER_1M', label: 'Dưới 1.000.000 đ' },
                { id: '1M_2.5M', label: '1.000.000 đ - 2.500.000 đ' },
                { id: '2.5M_5M', label: '2.500.000 đ - 5.000.000 đ' },
                { id: 'ABOVE_5M', label: 'Trên 5.000.000 đ' },
              ].map((p) => (
                <label
                  key={p.id}
                  onClick={() => setPriceRange(p.id)}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === p.id}
                    readOnly
                    className="w-3.5 h-3.5 text-[#074768] focus:ring-0"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Group 5: Có Sẵn Tại Showroom */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              CÓ SẴN TẠI SHOWROOM
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'Q1', label: 'Flagship Quận 1 (TP HCM)' },
                { id: 'HK', label: 'Chi nhánh Hoàn Kiếm (HN)' },
                { id: 'HC', label: 'Chi nhánh Hải Châu (ĐN)' },
              ].map((sh) => (
                <label
                  key={sh.id}
                  onClick={() => setSelectedShowroom([sh.id])}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={selectedShowroom.includes(sh.id)}
                    readOnly
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#074768] focus:ring-0"
                  />
                  <span>{sh.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => alert('Đã áp dụng bộ lọc tùy biến')}
            className="w-full bg-[#074768] hover:bg-[#09577f] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Áp dụng bộ lọc</span>
          </button>
        </aside>

        {/* Right Products Grid (Ảnh 3) */}
        <section className="lg:col-span-9 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {allProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#0284c7] transition duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with SKU Tag & Color Dots */}
                <div>
                  <div className="relative h-36 sm:h-40 bg-slate-50/90 p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* SKU Tag */}
                    <span className="absolute top-3.5 left-3.5 bg-white/95 text-[#074768] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                      {p.sku}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 space-y-1.5">
                    {/* Specs & Color Swatches */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        {p.specs}
                      </span>
                      {/* Color swatches */}
                      <div className="flex items-center gap-1">
                        {p.colors.map((c, i) => (
                          <span
                            key={i}
                            style={{ backgroundColor: c }}
                            className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-200"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-[#074768] transition">
                      {p.name}
                    </h3>

                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-normal">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="px-3 pb-3 pt-0">
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-[#074768]">
                        {formatPrice(p.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onViewDetail ? onViewDetail(p) : onAddToCart(p)}
                      className="bg-sky-50 hover:bg-[#074768] text-[#0369a1] hover:text-white px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1 active:scale-95"
                    >
                      <span>Chi tiết</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination (Ảnh 3) */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-slate-400">
              Trang 1 / 3 (Hiển thị 8 trên 24 sản phẩm)
            </span>

            <div className="flex items-center gap-1.5">
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700">
                &lt;
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#074768] text-white font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold flex items-center justify-center">
                2
              </button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold flex items-center justify-center">
                3
              </button>
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900">
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

