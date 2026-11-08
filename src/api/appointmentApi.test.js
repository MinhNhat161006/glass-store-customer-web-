import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appointmentApi } from './appointmentApi.js';

Object.defineProperty(globalThis, 'localStorage', {
  value: { getItem: () => 'customer-token' },
  configurable: true
});

test('appointment booking sends the customer token and returns the persisted location and date', async (context) => {
  let sent;
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    sent = { url, options };
    return {
      ok: true,
      json: async () => ({
        data: {
          id: 21,
          ticketCode: 'EP-1021',
          locationCode: 'BRANCH_01',
          scheduledDate: '2026-11-09'
        }
      })
    };
  });

  const saved = await appointmentApi.createAppointment({
    locationCode: 'BRANCH_01',
    scheduledDate: '2026-11-09'
  });

  assert.equal(sent.url, '/api/appointments');
  assert.equal(sent.options.method, 'POST');
  assert.equal(sent.options.headers.Authorization, 'Bearer customer-token');
  assert.deepEqual(JSON.parse(sent.options.body), {
    locationCode: 'BRANCH_01',
    scheduledDate: '2026-11-09'
  });
  assert.equal(saved.ticketCode, 'EP-1021');
  assert.equal(saved.locationCode, 'BRANCH_01');
});

test('appointment creation fails explicitly without a customer token', async (context) => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: { getItem: () => null },
    configurable: true
  });
  context.mock.method(globalThis, 'fetch', async () => {
    throw new Error('fetch must not be called without authentication');
  });

  await assert.rejects(
    appointmentApi.createAppointment({ locationCode: 'BRANCH_01' }),
    /đăng nhập tài khoản khách hàng/
  );
});
