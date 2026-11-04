export const money = value => Number(value || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export function catalogVariants(products) {
  return products.filter(p => p.status === 'ACTIVE').flatMap(p => (p.variants || [])
    .filter(v => v.status === 'ACTIVE')
    .map(v => ({ ...v, productId: p.id, productName: p.name, productType: p.productType,
      brandName: p.brandName, name: `${p.name}${v.name ? ` · ${v.name}` : ''}`,
      price: Number(v.price), stock: Number(v.availableQuantity ?? v.stockQuantity ?? 0) })));
}

export function validatePrescription(input) {
  const fields = ['odSph', 'odCyl', 'odAxis', 'odAdd', 'osSph', 'osCyl', 'osAxis', 'osAdd', 'pd'];
  const values = {};
  for (const field of fields) {
    if (input[field] == null || String(input[field]).trim() === '' || !Number.isFinite(Number(input[field]))) {
      throw new Error('Vui lòng nhập đầy đủ thông số cho hai mắt và PD.');
    }
    values[field] = Number(input[field]);
  }
  if (['odAxis', 'osAxis'].some(f => values[f] < 0 || values[f] > 180 || !Number.isInteger(values[f]))) throw new Error('AXIS phải là số nguyên từ 0 đến 180°.');
  if (values.pd <= 0 || values.pd > 100 || values.odAdd < 0 || values.osAdd < 0) throw new Error('Kiểm tra lại PD và ADD.');
  if (!input.confirmed) throw new Error('Vui lòng xác nhận thông số toa kính đã cung cấp.');
  return { ...values, confirmed: true };
}

export function addSelection(cart, selection) {
  const items = selection.items || [selection];
  const rx = selection.prescription || null;
  const existingRx = cart.find(item => item.prescription)?.prescription;
  if (rx && existingRx && JSON.stringify(rx) !== JSON.stringify(existingRx)) throw new Error('Mỗi đơn sử dụng một bộ thông số kính. Vui lòng đặt riêng cho toa khác.');
  const next = cart.map(item => ({ ...item }));
  for (const item of items) {
    if (!item.sku || !Number.isFinite(item.price) || item.price < 0) throw new Error('Vui lòng chọn sản phẩm từ danh mục hiện có.');
    const current = next.find(line => line.sku === item.sku);
    const quantity = (current?.quantity || 0) + (item.quantity || 1);
    if (item.stock != null && quantity > item.stock) throw new Error(`Không đủ tồn kho cho ${item.name}.`);
    if (current) Object.assign(current, { quantity, prescription: current.prescription || rx });
    else next.push({ ...item, quantity, prescription: rx });
  }
  return next;
}

export function checkoutPayload(cart, contact, user) {
  if (!cart.length) throw new Error('Giỏ hàng đang trống.');
  const customerId = user?.id ?? user?.userId;
  if (!customerId) throw new Error('Vui lòng đăng nhập lại để đặt hàng.');
  if (!contact.name.trim() || !contact.phone.trim() || !contact.address.trim()) throw new Error('Vui lòng nhập tên, số điện thoại và địa chỉ nhận hàng.');
  const snapshots = cart.filter(item => item.prescription).map(item => validatePrescription(item.prescription));
  if (snapshots.some(rx => JSON.stringify(rx) !== JSON.stringify(snapshots[0]))) throw new Error('Giỏ hàng có nhiều toa khác nhau. Vui lòng tách đơn.');
  const prescription = snapshots[0];
  const hasFrame = cart.some(item => item.productType === 'FRAME');
  return { channel: 'ONLINE', customerId, customerName: contact.name.trim(), customerPhone: contact.phone.trim(),
    shippingAddress: contact.address.trim(), paymentMethod: 'VIETQR',
    orderType: prescription ? (hasFrame ? 'COMPLETE_GLASSES' : 'LENS_ONLY') : cart.every(item => item.productType === 'ACCESSORY') ? 'ACCESSORY' : 'FRAME_ONLY',
    ...(prescription ? { prescription } : {}),
    items: cart.map(item => {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) throw new Error('Số lượng sản phẩm không hợp lệ.');
      return { sku: item.sku, quantity: item.quantity, expectedUnitPrice: item.price };
    }),
  };
}
