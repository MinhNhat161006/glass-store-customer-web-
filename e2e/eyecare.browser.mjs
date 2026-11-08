import test from 'node:test';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.CUSTOMER_BASE_URL || 'http://127.0.0.1:15173';
const user = { id: 5, fullName: 'Khách kiểm thử', phoneNumber: '0901234567', roles: ['ROLE_CUSTOMER'] };
const record = { id: 7, customerId: 5, customerName: user.fullName, version: 1, optometristName: 'Chuyên viên thật', odSph: 0, odCyl: 0, odAxis: 0, odAdd: 0, osSph: -1, osCyl: 0, osAxis: 0, osAdd: 0, pd: 64, createdAt: '2026-11-09T09:00:00', notes: 'Đã đối chiếu' };
test('browser: customer books then reads back appointment, records and immutable revisions', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let saved = null;
  try {
    await page.addInitScript(profile => { localStorage.setItem('optivision_customer_token', 'header.payload.signature'); localStorage.setItem('optivision_customer_user', JSON.stringify(profile)); }, user);
    await page.route('**/api/**', async route => {
      const path = new URL(route.request().url()).pathname;
      if (!path.startsWith('/api/')) return route.continue();
      let data = [];
      if (path.endsWith('/auth/me')) data = user;
      if (path === '/api/appointments') {
        if (route.request().method() === 'POST') {
          const body = route.request().postDataJSON();
          assert.equal(body.ticketType, 'ONLINE');
          assert.ok(body.scheduledTime.endsWith('+07:00'));
          assert.equal(body.optometristId, undefined);
          saved = { ...body, id: 12, ticketCode: 'EP-REAL-12', status: 'WAITING' };
          data = saved;
        } else data = saved ? [saved] : [];
      }
      if (path === '/api/prescriptions/customer/5') data = [record];
      if (path === '/api/prescriptions/7/revisions') data = [
        { ...record, actorId: 9, actorName: 'Chuyên viên thật', reason: 'Đối chiếu số đo', recordedAt: '2026-11-09T10:00:00' },
        { ...record, version: 0, pd: 63, actorId: 8, actorName: 'Người đo trước', reason: 'Initial prescription', recordedAt: record.createdAt },
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
    });
    await page.goto(baseUrl);
    await page.getByRole('button', { name: /Đặt Lịch|Đặt lịch|ĐẶT LỊCH/ }).first().click();
    await page.getByRole('heading', { name: 'Đặt lịch đo khúc xạ', exact: true }).waitFor();
    await page.getByLabel('Ngày và giờ hẹn (giờ Việt Nam)').fill('2027-11-09T09:00');
    await page.getByLabel('Ghi chú (tùy chọn)').fill('Cần đo lại');
    await page.getByRole('button', { name: 'Xác nhận đặt lịch', exact: true }).click();
    await page.getByRole('heading', { name: 'Đã lưu lịch hẹn EP-REAL-12', exact: true }).waitFor();
    await page.getByRole('cell', { name: 'EP-REAL-12', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Hồ sơ thị lực', exact: true }).click();
    await page.getByRole('heading', { name: 'TOA KÍNH #7 · v1', exact: true }).waitFor();
    await page.getByText('Người đo: Chuyên viên thật', { exact: false }).waitFor();
    await page.getByText('v1 ·', { exact: false }).last().click();
    await page.getByText('Thay đổi v0 → v1', { exact: true }).waitFor();
    assert.equal(await page.getByText('Trần Hoàng Nam', { exact: false }).count(), 0);
  } finally { await browser.close(); }
});

test('browser: signed-out customer sees login instead of sample medical records', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(baseUrl);
    await page.getByRole('button', { name: /Hồ Sơ|Hồ sơ|HỒ SƠ/ }).first().click();
    await page.getByText('Hồ sơ chỉ hiển thị cho chủ tài khoản đã đăng nhập.', { exact: true }).waitFor();
    assert.equal(await page.getByRole('heading', { name: /TOA KÍNH #/ }).count(), 0);
  } finally { await browser.close(); }
});
