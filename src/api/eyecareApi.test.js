import test from 'node:test';
import assert from 'node:assert/strict';
import { eyecareApi } from './eyecareApi.js';

const response = (status, data) => ({ ok: status < 400, status, json: async () => ({ data }) });
test('booking persists using the authenticated API and the returned ticket', async context => {
  globalThis.localStorage = { getItem: () => 'customer-token' };
  let sent;
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    sent = { url, options };
    return response(200, { id: 42, ticketCode: 'EP-42', status: 'WAITING' });
  });
  const payload = { ticketType: 'ONLINE', scheduledTime: '2026-11-09T09:00:00+07:00', notes: '' };
  assert.equal((await eyecareApi.createAppointment(payload)).ticketCode, 'EP-42');
  assert.equal(sent.url, '/api/appointments');
  assert.equal(sent.options.method, 'POST');
  assert.equal(sent.options.headers.Authorization, 'Bearer customer-token');
  assert.deepEqual(JSON.parse(sent.options.body), payload);
});
test('missing login never requests private records', async context => {
  globalThis.localStorage = { getItem: () => null };
  context.mock.method(globalThis, 'fetch', async () => assert.fail('Unauthenticated request'));
  await assert.rejects(eyecareApi.getPrescriptions(3), /đăng nhập/);
});
test('server failures and incomplete success cannot show booked success', async context => {
  globalThis.localStorage = { getItem: () => 'customer-token' };
  context.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 503, json: async () => ({ message: 'Identity unavailable' }) }));
  await assert.rejects(eyecareApi.createAppointment({}), error => error.status === 503);
  context.mock.method(globalThis, 'fetch', async () => response(200, {}));
  await assert.rejects(eyecareApi.createAppointment({}), /Chưa nhận được lịch hẹn/);
});
test('records, immutable revisions and appointments unwrap persisted arrays only', async context => {
  globalThis.localStorage = { getItem: () => 'customer-token' };
  const paths = [];
  context.mock.method(globalThis, 'fetch', async url => { paths.push(url); return response(200, [{ id: 4, version: 0, odSph: 0 }]); });
  assert.equal((await eyecareApi.getPrescriptions(3))[0].odSph, 0);
  assert.equal((await eyecareApi.getRevisions(4))[0].version, 0);
  await eyecareApi.getAppointments();
  assert.deepEqual(paths, ['/api/prescriptions/customer/3', '/api/prescriptions/4/revisions', '/api/appointments']);
  context.mock.method(globalThis, 'fetch', async () => response(200, null));
  await assert.rejects(eyecareApi.getPrescriptions(3), /không hợp lệ/);
});
