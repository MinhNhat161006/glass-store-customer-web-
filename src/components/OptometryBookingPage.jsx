import React, { useEffect, useRef, useState } from 'react';
import { eyecareApi } from '../api/eyecareApi.js';
import { appointmentDate, appointmentStatus, bookingTime } from './eyecareUtils.js';
import './eyecare.css';

export default function OptometryBookingPage({ setActiveTab, currentUser, openAuth }) {
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const locked = useRef(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);
  const [state, setState] = useState({ loading: true, rows: [], error: '' });
  const [retry, setRetry] = useState(0);
  const refresh = () => setRetry(value => value + 1);
  useEffect(() => {
    if (!currentUser?.id) { setState({ loading: false, rows: [], error: '' }); return; }
    let active = true;
    setState({ loading: true, rows: [], error: '' });
    eyecareApi.getAppointments().then(rows => { if (active) setState({ loading: false, rows, error: '' }); })
      .catch(err => { if (active) setState({ loading: false, rows: [], error: err.message }); });
    return () => { active = false; };
  }, [currentUser?.id, retry]);
  useEffect(() => { setTime(''); setNotes(''); setError(''); setSaved(null); }, [currentUser?.id]);
  const submit = async event => {
    event.preventDefault();
    if (locked.current || !currentUser?.id || saved) return;
    locked.current = true; setSaving(true); setError('');
    try {
      const scheduledTime = bookingTime(time);
      const appointment = await eyecareApi.createAppointment({ scheduledTime, notes: notes.trim(), ticketType: 'ONLINE', customerPhone: currentUser.phoneNumber || '' });
      setSaved(appointment);
      refresh();
    } catch (err) { setError(err.message); }
    finally { locked.current = false; setSaving(false); }
  };
  return <div className="eyecare-page"><header className="eyecare-header"><div><h1>Đặt lịch đo khúc xạ</h1><p className="eyecare-muted">Chọn thời gian bạn muốn đến đo mắt. Chuyên viên sẽ được phân công khi tiếp nhận.</p></div><button onClick={() => setActiveTab('records')}>Hồ sơ thị lực</button></header>
    {!currentUser?.id ? <section className="eyecare-panel"><p>Vui lòng đăng nhập để đặt và theo dõi lịch hẹn.</p><button className="eyecare-primary" onClick={openAuth}>Đăng nhập</button></section> : <>
      <section className="eyecare-panel"><h2>Thông tin lịch hẹn</h2><p>Khách hàng: <strong>{currentUser.fullName || currentUser.username}</strong></p>{currentUser.phoneNumber && <p>Số điện thoại: {currentUser.phoneNumber}</p>}
        {saved ? <div role="status" className="eyecare-success"><h2>Đã lưu lịch hẹn {saved.ticketCode}</h2><p>Thời gian: {appointmentDate(saved.scheduledTime)}</p><p>Trạng thái: {appointmentStatus[saved.status] || saved.status}</p><button onClick={() => { setSaved(null); setTime(''); setNotes(''); }}>Đặt lịch khác</button></div> : <form onSubmit={submit}><fieldset disabled={saving}><label htmlFor="booking-time">Ngày và giờ hẹn (giờ Việt Nam)<input id="booking-time" type="datetime-local" required value={time} onChange={event => setTime(event.target.value)} /></label><label htmlFor="booking-notes">Ghi chú (tùy chọn)<textarea id="booking-notes" value={notes} onChange={event => setNotes(event.target.value)} maxLength={500} rows={3} placeholder="Nhu cầu đo mắt hoặc thông tin cần báo cho chuyên viên" /></label>{error && <div role="alert" className="eyecare-error"><p>{error}</p><button type="button" onClick={refresh}>Tải lại lịch hẹn để kiểm tra</button></div>}<button className="eyecare-primary" type="submit">{saving ? 'Đang lưu…' : 'Xác nhận đặt lịch'}</button></fieldset></form>}
      </section>
      <section className="eyecare-panel"><div className="eyecare-header"><h2>Lịch hẹn của bạn</h2><button onClick={refresh} disabled={state.loading}>Làm mới</button></div>{state.loading ? <p role="status">Đang tải lịch hẹn…</p> : state.error ? <div role="alert" className="eyecare-error"><p>{state.error}</p><button onClick={refresh}>Thử lại</button></div> : !state.rows.length ? <p>Chưa có lịch hẹn.</p> : <div className="eyecare-overflow"><table className="eyecare-table"><thead><tr><th>Mã hẹn</th><th>Thời gian</th><th>Trạng thái</th><th>Phòng đo</th><th>Chuyên viên</th></tr></thead><tbody>{state.rows.map(row => <tr key={row.id}><td>{row.ticketCode || `#${row.id}`}</td><td>{appointmentDate(row.scheduledTime)}</td><td>{appointmentStatus[row.status] || row.status}</td><td>{row.roomName || 'Chưa phân phòng'}</td><td>{row.optometristName || 'Chưa phân công'}</td></tr>)}</tbody></table></div>}</section>
    </>}
  </div>;
}
