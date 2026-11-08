import React, { useEffect, useState } from 'react';
import { eyecareApi } from '../api/eyecareApi.js';
import { appointmentDate, measurement, revisionChanges, eyeFieldLabel } from './eyecareUtils.js';
import './eyecare.css';

function PrescriptionTable({ record }) {
  return <div className="eyecare-overflow"><table className="eyecare-table"><thead><tr><th>Mắt</th><th>SPH</th><th>CYL</th><th>AXIS (°)</th><th>ADD</th></tr></thead><tbody>{['od', 'os'].map(eye => <tr key={eye}><th>{eye === 'od' ? 'Mắt phải (OD)' : 'Mắt trái (OS)'}</th>{['Sph', 'Cyl', 'Axis', 'Add'].map(field => <td key={field}>{measurement(record[`${eye}${field}`])}</td>)}</tr>)}</tbody></table><p>Tổng PD: <strong>{measurement(record.pd)} mm</strong></p>{record.notes && <p>Ghi chú: {record.notes}</p>}{record.lensName && <p>Tròng chỉ định: {record.lensName}</p>}</div>;
}
export default function VisionRecordPage({ setActiveTab, currentUser, openAuth }) {
  const [state, setState] = useState({ loading: true, rows: [], error: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [retry, setRetry] = useState(0);
  const [versions, setVersions] = useState({ loading: false, rows: [], error: '', id: null });
  const [versionRetry, setVersionRetry] = useState(0);
  useEffect(() => {
    if (!currentUser?.id) { setState({ loading: false, rows: [], error: '' }); return; }
    let active = true;
    setSelectedId(null); setVersions({ loading: false, rows: [], error: '', id: null });
    setState({ loading: true, rows: [], error: '' });
    eyecareApi.getPrescriptions(currentUser.id).then(rows => {
      if (active) { setState({ loading: false, rows, error: '' }); setSelectedId(rows[0]?.id ?? null); }
    }).catch(error => { if (active) setState({ loading: false, rows: [], error: error.message }); });
    return () => { active = false; };
  }, [currentUser?.id, retry]);
  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    setVersions({ loading: true, rows: [], error: '', id: selectedId });
    eyecareApi.getRevisions(selectedId).then(rows => { if (active) setVersions({ loading: false, rows, error: '', id: selectedId }); })
      .catch(error => { if (active) setVersions({ loading: false, rows: [], error: error.message, id: selectedId }); });
    return () => { active = false; };
  }, [selectedId, versionRetry]);
  const selected = state.rows.find(row => row.id === selectedId);
  const revisions = versions.id === selectedId ? [...versions.rows].sort((a, b) => b.version - a.version) : [];
  return <div className="eyecare-page"><header className="eyecare-header"><div><h1>Hồ sơ thị lực của bạn</h1><p className="eyecare-muted">{currentUser?.fullName || 'Đăng nhập để xem toa kính và lịch sử thay đổi.'}</p></div><div className="eyecare-actions"><button onClick={() => setActiveTab('booking')}>Đặt lịch đo mắt</button><button onClick={() => setActiveTab('orders')}>Đơn hàng</button></div></header>
    {!currentUser?.id ? <section className="eyecare-panel"><p>Hồ sơ chỉ hiển thị cho chủ tài khoản đã đăng nhập.</p><button className="eyecare-primary" onClick={openAuth}>Đăng nhập</button></section> : state.loading ? <p role="status">Đang tải hồ sơ thị lực…</p> : state.error ? <div className="eyecare-error" role="alert"><p>{state.error}</p><button onClick={() => setRetry(value => value + 1)}>Thử lại</button></div> : !state.rows.length ? <section className="eyecare-panel"><h2>Chưa có toa kính</h2><p>Sau khi chuyên viên lưu kết quả đo, toa kính sẽ xuất hiện tại đây.</p><button className="eyecare-primary" onClick={() => setActiveTab('booking')}>Đặt lịch đo mắt</button></section> : <>
      <label>Chọn lần đo<select aria-label="Chọn toa kính" value={selectedId ?? ''} onChange={event => setSelectedId(Number(event.target.value))}>{state.rows.map(row => <option key={row.id} value={row.id}>Toa #{row.id} · {appointmentDate(row.createdAt)} · v{row.version}</option>)}</select></label>
      {selected && <section className="eyecare-panel eyecare-print"><h2>TOA KÍNH #{selected.id} · v{selected.version}</h2><p>Khách hàng: <strong>{selected.customerName || currentUser.fullName}</strong></p><p>Ngày đo: {appointmentDate(selected.createdAt)} · Người đo: {selected.optometristName || '—'}</p><PrescriptionTable record={selected} /><div className="eyecare-actions eyecare-no-print"><button className="eyecare-primary" onClick={() => window.print()}>In / Lưu PDF toa kính</button><button onClick={() => setActiveTab('products')}>Chọn kính</button></div></section>}
      <section className="eyecare-panel"><h2>Lịch sử phiên bản</h2>{versions.loading ? <p role="status">Đang tải lịch sử…</p> : versions.error ? <div role="alert" className="eyecare-error"><p>{versions.error}</p><button onClick={() => setVersionRetry(value => value + 1)}>Thử lại</button></div> : !revisions.length ? <p>Chưa có dữ liệu phiên bản.</p> : revisions.map(row => {
        const before = revisions.find(item => item.version === row.version - 1);
        const changes = before ? revisionChanges(before, row) : [];
        return <details key={row.version} className="eyecare-versions"><summary>v{row.version} · {appointmentDate(row.recordedAt)} · {row.actorName || '—'} (#{row.actorId ?? '—'})</summary><p>Lý do: {row.reason || '—'}</p><PrescriptionTable record={row} />{before && <><p>Thay đổi v{before.version} → v{row.version}</p><div className="eyecare-overflow"><table className="eyecare-table"><thead><tr><th>Trường</th><th>Trước</th><th>Sau</th></tr></thead><tbody>{changes.map(change => <tr key={change.field}><td>{eyeFieldLabel(change.field)}</td><td>{measurement(change.before)}</td><td>{measurement(change.after)}</td></tr>)}</tbody></table>{!changes.length && <p>Không thay đổi số đo hoặc ghi chú/tròng kính.</p>}</div></>}</details>;
      })}</section>
    </>}
  </div>;
}
