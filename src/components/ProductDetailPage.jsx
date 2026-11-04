import React, { useEffect, useMemo, useState } from 'react';
import { productApi } from '../api/productApi';
import { catalogVariants, money, validatePrescription } from './purchaseUtils';
import './purchase.css';

const emptyRx = { odSph:'',odCyl:'0',odAxis:'0',odAdd:'0',osSph:'',osCyl:'0',osAxis:'0',osAdd:'0',pd:'',confirmed:false };
export default function ProductDetailPage({ product, onAddToCart, setActiveTab }) {
  const [record, setRecord] = useState(null);
  const [lenses, setLenses] = useState([]);
  const [selectedSku, setSelectedSku] = useState('');
  const [lensSku, setLensSku] = useState('');
  const [mode, setMode] = useState('WITH_LENS');
  const [rx, setRx] = useState(emptyRx);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [recommendationError, setRecommendationError] = useState('');
  const id = product?.productId || product?.id;
  useEffect(() => {
    let active = true;
    if (!id) { setLoading(false); setError('Vui lòng chọn sản phẩm từ danh mục.'); return; }
    Promise.all([productApi.getProductById(id), productApi.getAllProducts({ productType:'LENS',status:'ACTIVE' })])
      .then(([p, list]) => {
        if (!active) return;
        const available = catalogVariants([p]);
        setRecord(p); setLenses(catalogVariants(list));
        setSelectedSku((available.find(v => v.stock > 0) || available[0])?.sku || '');
      }).catch(() => { if (active) setError('Không tải được chi tiết sản phẩm. Vui lòng quay lại danh mục và thử lại.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  useEffect(() => {
    let active = true; setRecommendation(null); setRecommendationError('');
    if (rx.odSph === '' || rx.osSph === '') return;
    const timer = setTimeout(() => {
      productApi.getLensRecommendations(Number(rx.odSph),Number(rx.osSph))
        .then(data => { if (active) setRecommendation(data); })
        .catch(() => { if (active) setRecommendationError('Chưa tải được gợi ý. Bạn vẫn có thể chọn tròng từ danh mục.'); });
    },250);
    return () => { active = false; clearTimeout(timer); };
  }, [rx.odSph,rx.osSph]);
  const variants = useMemo(() => record ? catalogVariants([record]) : [], [record]);
  const selected = variants.find(v => v.sku === selectedSku);
  const lens = lenses.find(v => v.sku === lensSku);
  const withRx = record?.productType === 'LENS' || (record?.productType === 'FRAME' && mode === 'WITH_LENS');
  const withExtraLens = record?.productType === 'FRAME' && withRx;
  const sortedLenses = [...lenses].sort((a,b) => Number(recommendation?.variants?.some(v => v.sku === b.sku)) - Number(recommendation?.variants?.some(v => v.sku === a.sku)));
  const changeRx = (field,value) => setRx(previous => ({ ...previous,[field]:value,confirmed:false }));
  function add(event) {
    event.preventDefault(); setError('');
    try {
      if (!selected || selected.stock <= 0) throw new Error('Biến thể đã hết hàng. Vui lòng chọn mẫu khác.');
      if (withExtraLens && (!lens || lens.stock <= 0)) throw new Error('Vui lòng chọn tròng kính còn hàng.');
      const prescription = withRx ? validatePrescription(rx) : null;
      onAddToCart({ items:[selected,...(withExtraLens ? [lens] : [])], prescription });
    } catch (err) { setError(err.message); }
  }
  return <main className="purchase-page"><button onClick={() => setActiveTab('products')}>← Danh mục sản phẩm</button>
    {loading ? <p role="status">Đang tải sản phẩm…</p> : !record ? <p role="alert" className="purchase-error">{error}</p> : <div className="purchase-detail-grid">
      <div className="purchase-card">{selected?.imageUrl && <img className="purchase-detail-image" src={selected.imageUrl} alt={record.name} />}<p className="purchase-muted">{record.description}</p></div>
      <form className="purchase-card" onSubmit={add}><p className="purchase-muted">{record.brandName}</p><h1>{record.name}</h1>
        <div className="purchase-fields"><label>Biến thể<select aria-label="Biến thể kính" value={selectedSku} onChange={event => setSelectedSku(event.target.value)}>{variants.map(v => <option key={v.sku} value={v.sku} disabled={v.stock <= 0}>{v.name} · {money(v.price)}{v.stock <= 0 ? ' · Hết hàng' : ''}</option>)}</select></label>
          {record.productType === 'FRAME' && <label>Loại kính<select value={mode} onChange={event => setMode(event.target.value)}><option value="WITH_LENS">Gọng và tròng theo toa</option><option value="FRAME_ONLY">Chỉ mua gọng</option></select></label>}
        </div>
        {withRx && <>
          <div className="purchase-rx"><table><thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS (°)</th><th>ADD</th></tr></thead><tbody>{[['od','Phải (OD)'],['os','Trái (OS)']].map(([eye,label]) => <tr key={eye}><th>{label}</th>{['Sph','Cyl','Axis','Add'].map(field => <td key={field}><input aria-label={`${eye.toUpperCase()} ${field.toUpperCase()}`} required type="number" step={field === 'Axis' ? '1' : '0.25'} min={field === 'Axis' || field === 'Add' ? '0' : '-99.75'} max={field === 'Axis' ? '180' : '99.75'} value={rx[eye+field]} onChange={event => changeRx(eye+field,event.target.value)} /></td>)}</tr>)}</tbody></table></div>
          <label className="purchase-field">Khoảng cách đồng tử PD (mm)<input required aria-label="PD" type="number" min="0.1" max="100" step="0.1" value={rx.pd} onChange={event => changeRx('pd',event.target.value)} /></label>
          {withExtraLens && <label className="purchase-field" style={{marginTop:16}}>Tròng kính<select required aria-label="Chọn tròng kính" value={lensSku} onChange={event => setLensSku(event.target.value)}><option value="">Chọn loại tròng</option>{sortedLenses.map(v => <option key={v.sku} value={v.sku} disabled={v.stock <= 0}>{recommendation?.variants?.some(item => item.sku === v.sku) ? 'Gợi ý · ' : ''}{v.name} · {money(v.price)}{v.stock <= 0 ? ' · Hết hàng' : ''}</option>)}</select></label>}
          {recommendation && <p className="purchase-muted">Gợi ý của hệ thống: chiết suất {recommendation.indexes?.join(' / ')}. Nhân viên sẽ kiểm tra toa và loại tròng trước khi gia công.</p>}
          {recommendationError && <p className="purchase-muted">{recommendationError}</p>}
          <label className="purchase-check"><input type="checkbox" required checked={rx.confirmed} onChange={event => setRx({...rx,confirmed:event.target.checked})} /><span>Tôi xác nhận thông số đã nhập đúng với toa kính mình cung cấp.</span></label>
        </>}
        {error && <p role="alert" className="purchase-error">{error}</p>}
        <div className="purchase-actions"><strong style={{alignSelf:'center'}}>{money((selected?.price || 0) + (withExtraLens ? lens?.price || 0 : 0))}</strong><button className="purchase-primary" type="submit" disabled={!selected || selected.stock <= 0}>Thêm vào giỏ</button></div>
      </form>
    </div>}
  </main>;
}