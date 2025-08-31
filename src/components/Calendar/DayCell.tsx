
import React, { useState } from 'react'
import { format } from 'date-fns'
import type { EventItem } from '../../types'
import EditEventModal from '../Modal/EditEventModal'

interface Props {
  dateObj: Date
  iso: string
  isOutside: boolean
  selected: boolean
  events: EventItem[]
  onToggle: () => void
}

export default function DayCell({ dateObj, iso, isOutside, selected, events, onToggle }: Props) {
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={['cell', isOutside ? 'outside' : '', selected ? 'selected' : ''].join(' ')} onClick={onToggle}>
      <div className="flex">
        <div className="date-badge">{format(dateObj, 'd')}</div>
        <div className="right">{events.length ? <span className="chip" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>{events.length} meeting(s)</span> : null}</div>
      </div>
      <div>
        {events.slice(0, 3).map(ev => (
          <div key={ev.id} className="event" onClick={(e) => { e.stopPropagation(); setEditing(ev) }}>
            <div className="title">{ev.student_name}</div>
            <div className="meta">{ev.class_name} • {ev.attendance}</div>
          </div>
        ))}
        {events.length > 3 && <div className="meta" onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowAll(true); }} style={{cursor: 'pointer', color: 'var(--primary)'}}>+{events.length - 3} more…</div>}
      </div>
      {editing && <EditEventModal event={editing} onClose={() => setEditing(null)} />}
      {showAll && (
        <div className="modal-backdrop d-flex align-items-center justify-content-center" onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowAll(false); }} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', margin: '1.75rem auto'}}>
            <div className="modal-content" style={{background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--muted)', borderRadius: '0.375rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'}}>
              <div className="modal-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--muted)'}}>
                <h5 className="modal-title" style={{margin: 0, fontSize: '1.25rem', fontWeight: 500}}>All Meetings - {format(dateObj, 'MMM d, yyyy')}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAll(false)} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text)', opacity: 0.5}} aria-label="Close">×</button>
              </div>
              <div className="modal-body" style={{padding: '1rem', maxHeight: '400px', overflowY: 'auto'}}>
                {events.map(event => (
                  <div key={event.id} className="event" onClick={() => { setShowAll(false); setEditing(event); }} style={{padding: '0.75rem', marginBottom: '0.5rem', border: '1px solid var(--muted)', borderRadius: '0.375rem', cursor: 'pointer', background: 'var(--background)'}}>
                    <div className="title" style={{fontWeight: 500, marginBottom: '0.25rem'}}>{event.student_name}</div>
                    <div className="meta" style={{fontSize: '0.875rem', color: 'var(--muted-text)'}}>{event.class_name} • {event.attendance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
