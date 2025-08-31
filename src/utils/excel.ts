
import * as XLSX from 'xlsx'
import type { EventItem } from '../types'

function summarizeByDate(eventsByDate: Record<string, EventItem[]>) {
  const classSet = new Set<string>()
  const rows: any[] = []

  // Pre-scan for all classes
  for (const date of Object.keys(eventsByDate)) {
    for (const e of eventsByDate[date]) classSet.add(e.class_name)
  }
  const classes = Array.from(classSet).sort()

  for (const date of Object.keys(eventsByDate).sort()) {
    const day = eventsByDate[date]
    const countsByClass: Record<string, number> = {}
    let present = 0, absent = 0, late = 0
    for (const c of classes) countsByClass[c] = 0
    for (const e of day) {
      countsByClass[e.class_name]++
      if (e.attendance === 'Present') present++
      else if (e.attendance === 'Absent') absent++
      else if (e.attendance === 'Late') late++
    }
    const total = day.length
    const row: any = { Date: date }
    for (const c of classes) row[c] = countsByClass[c]
    row['Present'] = present
    row['Absent'] = absent
    row['Late'] = late
    row['Total'] = total
    rows.push(row)
  }
  return { classes, rows }
}

export function exportWorkbook(eventsByDate: Record<string, EventItem[]>) {
  const wb = XLSX.utils.book_new()

  // Overview sheet
  const { classes, rows } = summarizeByDate(eventsByDate)
  const overview = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, overview, 'Overview')

  // Per-date sheets
  for (const date of Object.keys(eventsByDate).sort()) {
    const rows = eventsByDate[date].map(e => ({
      'Student Name': e.student_name,
      'Class Name': e.class_name,
      'Age': e.age,
      'Instructor': e.instructor_name,
      'Meeting Link': e.meeting_link,
      'Attendance Status': e.attendance
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    XLSX.utils.book_append_sheet(wb, ws, date)
  }

  XLSX.writeFile(wb, 'meeting-schedule.xlsx')
}
