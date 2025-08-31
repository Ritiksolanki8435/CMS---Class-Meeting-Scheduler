import {endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek, eachDayOfInterval } from 'date-fns'
import { useAppDispatch, useAppSelector } from '../../store'
import { nextMonth, prevMonth, toggleSelectDate } from '../../store/slices/schedulerSlice'
import DayCell from './DayCell'

export default function Calendar() {
  const dispatch = useAppDispatch()
  const { monthCursor, selectedDates, eventsByDate, filters } = useAppSelector(s => s.scheduler)

  const start = startOfWeek(startOfMonth(monthCursor), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(monthCursor), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start, end })
  
  // Filter events based on current filter criteria
  const filterEvents = (events: any[]) => {
    return events.filter(event => {
      const classOk = !filters.className || event.class_name.toLowerCase().includes(filters.className.toLowerCase())
      const studentOk = !filters.studentQuery || event.student_name.toLowerCase().includes(filters.studentQuery.toLowerCase())
      return classOk && studentOk
    })
  } 

  return (
    <div className="grid">
   <div className="calendar-header">
     <div className="flex">
    <button className="btn" onClick={() => dispatch(prevMonth())}>
      <i className="bi bi-chevron-left fs-10"></i>
    </button>
    <div className="chip">{format(monthCursor, 'MMMM yyyy')}</div>
    <button className="btn" onClick={() => dispatch(nextMonth())}>
      <i className="bi bi-chevron-right fs-10"></i>
    </button>
     </div>
    <div className="chips">
    {selectedDates.map(d => (<span className="chip" key={d}>{d}</span>))}
    </div>
  </div>

      <div className="calendar">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div className="dow" key={d}>{d}</div>)}
        {days.map((d) => {
          const iso = format(d, 'yyyy-MM-dd')
          const isOutside = !isSameMonth(d, monthCursor)
          const selected = selectedDates.includes(iso)
          const allEvents = eventsByDate[iso] ?? []
          const events = filterEvents(allEvents)
          return (
            <DayCell
              key={iso}
              dateObj={d}
              iso={iso}
              isOutside={isOutside}
              selected={selected}
              events={events}
              onToggle={() => dispatch(toggleSelectDate(iso))}
            />
          )
        })}
      </div>
    </div>
  )
}
