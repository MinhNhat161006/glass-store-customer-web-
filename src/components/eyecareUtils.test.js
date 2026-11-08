import test from 'node:test';
import assert from 'node:assert/strict';
import { bookingTime, measurement, revisionChanges } from './eyecareUtils.js';
test('booking times are future Vietnam timestamps instead of fixed mock dates', () => {
  const now = new Date('2026-11-08T14:00:00Z');
  assert.equal(bookingTime('2026-11-09T09:00', now), '2026-11-09T09:00:00+07:00');
  assert.throws(() => bookingTime('2026-11-08T20:00', now), /tương lai/);
  assert.throws(() => bookingTime('2026-11-08', now), /chọn ngày/);
  assert.throws(() => bookingTime('2026-02-31T09:00', new Date('2026-01-01')), /hợp lệ/);
  assert.throws(() => bookingTime('2026-13-01T09:00', now), /hợp lệ/);
});
test('digital records show missing values separately from true zero', () => {
  assert.equal(measurement(0), '0');
  assert.equal(measurement(null), '—');
  assert.deepEqual(revisionChanges({ odSph: null, pd: '64.0' }, { odSph: 0, pd: 64 }), [{ field: 'odSph', before: null, after: 0 }]);
});
