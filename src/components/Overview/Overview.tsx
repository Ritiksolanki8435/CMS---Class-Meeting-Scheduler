import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useAppSelector } from '../../store'
import { exportWorkbook } from '../../utils/excel'

export default function Overview() {
  const { eventsByDate } = useAppSelector(s => s.scheduler)
  const isDarkMode = useAppSelector(state => state.theme.isDarkMode)

  const classes = useMemo(() => {
    const set = new Set<string>()
    for (const date of Object.keys(eventsByDate)) for (const e of eventsByDate[date]) set.add(e.class_name)
    return Array.from(set).sort()
  }, [eventsByDate])

  const rows = useMemo(() => {
    const list: any[] = []
    for (const date of Object.keys(eventsByDate).sort()) {
      const ebd = eventsByDate[date]
      const row: any = { date }
      for (const c of classes) row[c] = 0
      let present = 0, absent = 0, late = 0
      for (const e of ebd) {
        row[e.class_name]++
        if (e.attendance === 'Present') present++
        else if (e.attendance === 'Absent') absent++
        else if (e.attendance === 'Late') late++
      }
      row['present'] = present
      row['absent'] = absent
      row['late'] = late
      row['total'] = ebd.length
      list.push(row)
    }
    return list
  }, [eventsByDate, classes])

  return (
    <div className={`container-fluid ${isDarkMode ? 'dark' : ''}`}>
      <header className="header bg-primary text-white p-3 mb-3">
        <h4 className="mb-0">Overview</h4>
        <nav className="nav">
          <Link to="/" className="text-white text-decoration-none">Calendar</Link>
        </nav>
        <ThemeToggle />
      </header>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => exportWorkbook(eventsByDate)} disabled={Object.keys(eventsByDate).length === 0}>Export to Excel</button>
      </div>

      {Object.keys(eventsByDate).length === 0 ? (
        <div className="d-flex align-items-center justify-content-center" style={{height: '50vh'}}>
          <p className="text-muted fs-5">No data yet — go to Calendar, pick dates, then click "Schedule Meetings".</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              {classes.map(c => <th key={c}>{c}</th>)}
              <th>Present</th>
              <th>Absent</th>
              <th>Late</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.date}</td>
                {classes.map(c => <td key={c}>{r[c]}</td>)}
                <td>{r.present}</td>
                <td>{r.absent}</td>
                <td>{r.late}</td>
                <td>{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}