
import { format } from 'date-fns'
import { nanoid } from '@reduxjs/toolkit'
import type { Student, EventItem } from '../types'

function pickBestDateForClass(
  dates: string[],
  classOnDateCount: Record<string, Record<string, number>>,
  totalOnDateCount: Record<string, number>,
  className: string
): string {
  // Choose the date with the smallest count for this class; tie-breaker: smallest total, then earliest date
  let best = dates[0]
  for (const d of dates) {
    const classCount = classOnDateCount[d]?.[className] ?? 0
    const bestClassCount = classOnDateCount[best]?.[className] ?? 0
    if (classCount < bestClassCount) {
      best = d
      continue
    }
    if (classCount === bestClassCount) {
      const total = totalOnDateCount[d] ?? 0
      const bestTotal = totalOnDateCount[best] ?? 0
      if (total < bestTotal) {
        best = d
        continue
      }
      if (total === bestTotal && d < best) {
        best = d
      }
    }
  }
  return best
}

export function buildSchedule(
  selectedDates: string[],
  students: Student[]
): Record<string, EventItem[]> {
  if (!selectedDates.length) return {}
  // Normalize: YYYY-MM-DD sorted
  const dates = [...selectedDates].sort()

  // Create one meeting slot per student and sort by age desc (older first)
  type Slot = { student: Student }
  const slots: Slot[] = students.map(s => ({ student: s }))
  slots.sort((a, b) => b.student.age - a.student.age)

  const eventsByDate: Record<string, EventItem[]> = {}
  const classOnDateCount: Record<string, Record<string, number>> = {}
  const totalOnDateCount: Record<string, number> = {}

  for (const d of dates) {
    eventsByDate[d] = []
    classOnDateCount[d] = {}
    totalOnDateCount[d] = 0
  }

  for (const slot of slots) {
    const d = pickBestDateForClass(dates, classOnDateCount, totalOnDateCount, slot.student.class_name)
    const event: EventItem = {
      id: nanoid(),
      date: d,
      student_name: slot.student.student_name,
      class_name: slot.student.class_name,
      age: slot.student.age,
      instructor_name: slot.student.instructor_name,
      meeting_link: `https://meet.example.com/${nanoid(8)}`,
      attendance: 'Scheduled'
    }
    eventsByDate[d].push(event)
    classOnDateCount[d][slot.student.class_name] = (classOnDateCount[d][slot.student.class_name] ?? 0) + 1
    totalOnDateCount[d] = (totalOnDateCount[d] ?? 0) + 1
  }

  // Sort events in each day by class then student for a tidy UI
  for (const d of dates) {
    eventsByDate[d].sort((a, b) => a.class_name.localeCompare(b.class_name) || a.student_name.localeCompare(b.student_name))
  }
  return eventsByDate
}
