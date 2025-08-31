
export type AttendanceStatus = 'Scheduled' | 'Present' | 'Absent' | 'Late'

export interface Student {
  student_name: string
  meetings: number
  age: number
  class_name: string
  instructor_name: string
}

export interface EventItem {
  id: string
  date: string // ISO yyyy-MM-dd
  student_name: string
  class_name: string
  age: number
  instructor_name: string
  meeting_link: string
  attendance: AttendanceStatus
}
