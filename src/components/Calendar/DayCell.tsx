
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

  return (
    <div className={['cell', isOutside ? 'outside' : '', selected ? 'selected' : ''].join(' ')} onClick={onToggle}>
      <div className="flex">
        <div className="date-badge">{format(dateObj, 'd')}</div>
        <div className="right">{events.length ? <span className="chip">{events.length} meeting(s)</span> : null}</div>
      </div>
      <div>
        {events.slice(0, 3).map(ev => (
          <div key={ev.id} className="event" onClick={(e) => { e.stopPropagation(); setEditing(ev) }}>
            <div className="title">{ev.student_name}</div>
            <div className="meta">{ev.class_name} • {ev.attendance}</div>
          </div>
        ))}
        {events.length > 3 && <div className="meta" onClick={(e) => e.stopPropagation()}>+{events.length - 3} more…</div>}
      </div>
      {editing && <EditEventModal event={editing} onClose={() => setEditing(null)} />}
    </div>
  )
}
