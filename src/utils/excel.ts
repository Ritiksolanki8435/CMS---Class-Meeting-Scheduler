
import * as XLSX from 'xlsx'
import type { EventItem } from '../types'

export function exportWorkbook(eventsByDate: Record<string, EventItem[]>) {
  const wb = XLSX.utils.book_new()
  const allRows: any[] = []

  // Create single sheet with all data
  for (const date of Object.keys(eventsByDate).sort()) {
    for (const event of eventsByDate[date]) {
      allRows.push({
        'Date': date,
        'Student Name': event.student_name,
        'Age': event.age,
        'Meeting Link': event.meeting_link,
        'Attendance': event.attendance
      })
    }
  }

  const ws = XLSX.utils.json_to_sheet(allRows)
  
  // Auto-size columns
  const cols = [
    { wch: 12 }, // Date
    { wch: 20 }, // Student Name
    { wch: 8 },  // Age
    { wch: 40 }, // Meeting Link
    { wch: 12 }  // Attendance
  ]
  ws['!cols'] = cols
  
  XLSX.utils.book_append_sheet(wb, ws, 'Meeting Schedule')
  XLSX.writeFile(wb, 'meeting-schedule.xlsx')
}
