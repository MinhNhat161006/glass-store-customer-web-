import React from 'react';
import { money } from './purchaseUtils';
import './purchase.css';

export default function OrderConfirmation({ order, onContinue }) {
  return <main className="purchase-page"><section className="purchase-card">
    <h1>Đã tạo đơn hàng</h1><p className="purchase-muted">Mã đơn <strong>{order.orderCode}</strong> · Chờ xác nhận thanh toán</p>
    <p>{order.customerName} · {order.customerPhone}</p><p>{order.shippingAddress}</p>
    <div className="purchase-summary">{(order.items || []).map(item => <p key={item.id || item.skuId}><span>{item.productName} × {item.quantity}</span><strong>{money(item.subtotal)}</strong></p>)}<p><strong>Tổng tiền</strong><strong>{money(order.finalAmount)}</strong></p></div>
    {order.prescription && <p>Thông số kính bạn cung cấp đã được lưu cùng đơn hàng để nhân viên kiểm tra.</p>}
    <button className="purchase-primary" onClick={onContinue}>Tiếp tục xem sản phẩm</button>
  </section></main>;
}
