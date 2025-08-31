
import React, { useState } from 'react'
import type { EventItem, AttendanceStatus } from '../../types'
import { useAppDispatch } from '../../store'
import { deleteEvent, updateAttendance } from '../../store/slices/schedulerSlice'

export default function EditEventModal({ event, onClose }: { event: EventItem, onClose: () => void }) {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<AttendanceStatus>(event.attendance)

  const handleSave = () => {
    dispatch(updateAttendance({ date: event.date, id: event.id, attendance: status }))
    onClose()
  }

  const handleDelete = () => {
    dispatch(deleteEvent({ date: event.date, id: event.id }))
    onClose()
  }

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center" onClick={onClose} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', margin: '1.75rem auto'}}>
        <div className="modal-content" style={{background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--muted)', borderRadius: '0.375rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}}>
          <div className="modal-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--muted)'}}>
            <h5 className="modal-title" style={{margin: 0, fontSize: '1.25rem', fontWeight: 500}}>Edit Event</h5>
            <button type="button" className="btn-close" onClick={onClose} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text)', opacity: 0.5}} aria-label="Close">×</button>
          </div>
          <div className="modal-body" style={{padding: '1rem'}}>
            <div className="chips" style={{marginBottom: '1rem'}}>
              <span className="chip">{event.date}</span>
              <span className="chip">{event.class_name}</span>
              <span className="chip">{event.instructor_name}</span>
            </div>
            <p><b>{event.student_name}</b> • Age {event.age}</p>
            <p><a href={event.meeting_link} target="_blank">{event.meeting_link}</a></p>

            <div className="mb-3">
              <label className="form-label" style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Status</label>
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value as AttendanceStatus)} style={{display: 'block', width: '100%', padding: '0.375rem 0.75rem', fontSize: '1rem', lineHeight: 1.5, background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--muted)', borderRadius: '0.375rem'}}>
                <option>Scheduled</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '1rem', borderTop: '1px solid var(--muted)', gap: '0.5rem'}}>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
