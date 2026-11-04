import React, { useRef, useState } from 'react';
import { checkoutApi } from '../api/checkoutApi';
import { checkoutPayload, money } from './purchaseUtils';
import './purchase.css';

export default function CheckoutModal({ cart, user, requestRef, onClose, onSuccess }) {
  const [contact, setContact] = useState({ name: user?.fullName || '', phone: user?.phoneNumber || '', address: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [priceChange, setPriceChange] = useState(null);
  const [acceptPriceChange, setAcceptPriceChange] = useState(false);
  const localRequest = useRef(null);
  const request = requestRef || localRequest;
  const locked = useRef(false);
  const rx = cart.find(item => item.prescription)?.prescription;
  async function submit(event) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setSaving(true); setError('');
    try {
      const payload = checkoutPayload(cart, contact, user);
      if (priceChange && acceptPriceChange) payload.acceptPriceChange = true;
      const fingerprint = JSON.stringify(payload);
      if (request.current?.fingerprint !== fingerprint) request.current = { fingerprint, key: crypto.randomUUID() };
      const order = await checkoutApi.createOrder(payload, request.current.key);
      onSuccess(order);
    } catch (err) {
      setError(err.message);
      if (err.code === 'ORDER_PRICE_CHANGED') { setPriceChange(err.details); setAcceptPriceChange(false); }
    }
    finally { locked.current = false; setSaving(false); }
  }
  return <div className="purchase-overlay"><section role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="purchase-modal">
    <h2 id="checkout-title">Xác nhận đặt hàng</h2>
    <form onSubmit={submit}><fieldset disabled={saving}>
      <div className="purchase-fields">{[['name', 'Họ tên'], ['phone', 'Số điện thoại'], ['address', 'Địa chỉ nhận hàng']].map(([field, label]) => <label key={field}>{label}<input required maxLength={field === 'address' ? 500 : field === 'name' ? 120 : 30} type={field === 'phone' ? 'tel' : 'text'} value={contact[field]} onChange={event => setContact({ ...contact, [field]: event.target.value })} /></label>)}</div>
      <div className="purchase-summary">{cart.map(item => <p key={item.sku}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></p>)}<p><span>Tạm tính</span><strong>{money(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}</strong></p></div>
      {rx && <div className="purchase-rx-summary"><strong>Thông số khách cung cấp</strong><p>OD: SPH {rx.odSph} / CYL {rx.odCyl} / AXIS {rx.odAxis}°</p><p>OS: SPH {rx.osSph} / CYL {rx.osCyl} / AXIS {rx.osAxis}° · PD {rx.pd} mm</p><p>Nhân viên sẽ kiểm tra trước khi xác nhận gia công.</p></div>}
      <p className="purchase-muted">Thanh toán chuyển khoản, chờ xác nhận. Số tiền cuối cùng được tính lại theo danh mục khi đặt hàng.</p>
      {priceChange && <div className="purchase-rx-summary"><strong>Tổng tiền cập nhật: {money(priceChange.newTotal)}</strong><label className="purchase-check"><input type="checkbox" required checked={acceptPriceChange} onChange={event => setAcceptPriceChange(event.target.checked)} />Tôi đồng ý với số tiền cập nhật trước khi đặt hàng.</label></div>}
      {error && <p role="alert" className="purchase-error">{error}</p>}
      <div className="purchase-actions"><button type="button" onClick={onClose}>Quay lại</button><button type="submit" className="purchase-primary">{saving ? 'Đang đặt hàng…' : 'Xác nhận đặt hàng'}</button></div>
    </fieldset></form>
  </section></div>;
}
