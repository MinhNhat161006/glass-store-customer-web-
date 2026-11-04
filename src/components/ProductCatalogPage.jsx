import React, { useEffect, useMemo, useState } from 'react';
import { productApi } from '../api/productApi';
import { catalogVariants, money } from './purchaseUtils';
import './purchase.css';

export default function ProductCatalogPage({ onAddToCart, onViewDetail }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('ALL');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true; setLoading(true); setError('');
    productApi.getAllProducts({ status: 'ACTIVE' }).then(data => {
      if (!Array.isArray(data)) throw new Error('Dữ liệu sản phẩm không hợp lệ.');
      if (active) setProducts(data);
    }).catch(() => { if (active) setError('Không tải được danh mục sản phẩm.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi-VN');
    return products.filter(p => p.status === 'ACTIVE' && (type === 'ALL' || p.productType === type)
      && (!keyword || [p.name, p.brandName, ...(p.variants || []).map(v => v.sku)].some(value => String(value || '').toLocaleLowerCase('vi-VN').includes(keyword))));
  }, [products, query, type]);
  return <main className="purchase-page"><h1>Sản phẩm</h1><p className="purchase-muted">Chọn gọng kính, tròng kính và thông số theo toa của bạn.</p>
    <div className="purchase-toolbar"><input aria-label="Tìm sản phẩm" placeholder="Tên, thương hiệu hoặc SKU" value={query} onChange={event => setQuery(event.target.value)} /><select aria-label="Loại sản phẩm" value={type} onChange={event => setType(event.target.value)}><option value="ALL">Tất cả sản phẩm</option>{[['FRAME','Gọng kính'],['LENS','Tròng kính'],['SUNGLASSES','Kính mát'],['ACCESSORY','Phụ kiện']].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div>
    {loading ? <p role="status">Đang tải sản phẩm…</p> : error ? <div role="alert" className="purchase-error">{error} <button onClick={() => setRetry(value => value + 1)}>Thử lại</button></div> : !filtered.length ? <p>Không có sản phẩm phù hợp.</p> : <div className="purchase-grid">{filtered.map(p => {
      const variants = catalogVariants([p]);
      const variant = variants.find(v => v.stock > 0) || variants[0];
      if (!variant) return null;
      return <article className="purchase-product" key={p.id}>
        {variant.imageUrl ? <img src={variant.imageUrl} alt={p.name} /> : <div style={{height:190,display:'grid',placeItems:'center',background:'#f1f5f9'}}>OptiVision</div>}
        <div className="purchase-product-info"><span className="purchase-muted">{p.brandName}</span><h2>{p.name}</h2><strong>{money(Math.min(...variants.map(v => v.price)))}</strong>
          <button onClick={() => onViewDetail(p)}>Xem & chọn kính</button>
          {!['FRAME','LENS'].includes(p.productType) && <button disabled={variant.stock <= 0} className="purchase-primary" onClick={() => { try { onAddToCart(variant); } catch (err) { setError(err.message); } }}>Thêm vào giỏ</button>}
        </div>
      </article>;
    })}</div>}
  </main>;
}