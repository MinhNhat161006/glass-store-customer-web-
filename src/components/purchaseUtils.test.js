import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addSelection, checkoutPayload, validatePrescription, catalogVariants } from './purchaseUtils.js';

const rx = { odSph:-2,odCyl:0,odAxis:0,odAdd:0,osSph:-1.5,osCyl:-0.5,osAxis:180,osAdd:0,pd:63,confirmed:true };
const frame = {sku:'FRM-1',name:'Frame',price:1000000,productType:'FRAME',stock:5};
const lens = {sku:'LNS-1',name:'Lens',price:500000,productType:'LENS',stock:5};
test('complete glasses checkout retains both SKUs and zero-valued prescription measurements', () => {
  const cart=addSelection([], {items:[frame,lens],prescription:validatePrescription(rx)});
  const payload=checkoutPayload(cart,{name:' Khách ',phone:'0901234567',address:' Địa chỉ '},{id:10});
  assert.equal(payload.channel,'ONLINE'); assert.equal(payload.orderType,'COMPLETE_GLASSES');
  assert.equal(payload.customerName,'Khách'); assert.equal(payload.prescription.odAxis,0);
  assert.deepEqual(payload.items.map(item=>item.sku),['FRM-1','LNS-1']);
  assert.equal(payload.items[0].expectedUnitPrice,1000000);
});
test('does not mix different prescriptions or mutate the cart after a rejected selection', () => {
  const cart=addSelection([], {items:[frame,lens],prescription:rx});
  assert.throws(()=>addSelection(cart,{items:[frame,lens],prescription:{...rx,odSph:-3}}),/toa khác/);
  assert.equal(cart[0].quantity,1);
  assert.throws(()=>addSelection(cart,{...frame,quantity:9}),/tồn kho/);
  assert.equal(cart[0].quantity,1);
});
test('blank measurements, missing confirmation and invalid axis are rejected', () => {
  assert.throws(()=>validatePrescription({...rx,odSph:''}),/đầy đủ/);
  assert.throws(()=>validatePrescription({...rx,confirmed:false}),/xác nhận/);
  assert.throws(()=>validatePrescription({...rx,osAxis:181}),/AXIS/);
  assert.throws(()=>checkoutPayload([frame],{name:'A',phone:'1',address:'B'},null),/đăng nhập/);
});
test('catalog excludes inactive variants and respects available stock including zero', () => {
  const rows=catalogVariants([{id:1,name:'Frame',status:'ACTIVE',variants:[
    {sku:'A',status:'ACTIVE',price:100,availableQuantity:0,stockQuantity:10},
    {sku:'B',status:'INACTIVE',price:100,stockQuantity:10},
  ]}]);
  assert.equal(rows.length,1); assert.equal(rows[0].stock,0);
});
