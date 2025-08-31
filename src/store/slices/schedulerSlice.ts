
import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import type { AttendanceStatus, EventItem, Student } from '../../types'
import { buildSchedule } from '../../utils/scheduler'

// Async: simulate API fetch for students
export const loadStudents = createAsyncThunk<Student[]>('scheduler/loadStudents', async () => {
  const res = await fetch('/students.json')
  const data = (await res.json()) as Student[]
  // mimic network
  await new Promise(r => setTimeout(r, 200))
  return data
})

export interface SchedulerState {
  monthCursor: Date
  selectedDates: string[]
  students: Student[]
  filters: { className: string; studentQuery: string }
  eventsByDate: Record<string, EventItem[]>
  isScheduling: boolean
}

const initialState: SchedulerState = {
  monthCursor: new Date(),
  selectedDates: [],
  students: [],
  filters: { className: '', studentQuery: '' },
  eventsByDate: {},
  isScheduling: false
}

const slice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    nextMonth(state) { state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1) },
    prevMonth(state) { state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1) },
    toggleSelectDate(state, action: PayloadAction<string>) {
      const d = action.payload
      if (state.selectedDates.includes(d)) {
        state.selectedDates = state.selectedDates.filter(x => x !== d)
        delete state.eventsByDate[d]
      } else {
        state.selectedDates.push(d)
        state.selectedDates.sort()
        state.eventsByDate[d] = state.eventsByDate[d] ?? []
      }
    },
    clearSelectedDates(state) {
      state.selectedDates = []
      state.eventsByDate = {}
    },
    setFilterClass(state, action: PayloadAction<string>) { state.filters.className = action.payload },
    setFilterStudent(state, action: PayloadAction<string>) { state.filters.studentQuery = action.payload },
    addEvent(state, action: PayloadAction<Omit<EventItem, 'id' | 'attendance'>>) {
      const e: EventItem = { ...action.payload, id: nanoid(), attendance: 'Scheduled' }
      state.eventsByDate[e.date] = state.eventsByDate[e.date] ?? []
      state.eventsByDate[e.date].push(e)
    },
    updateAttendance(state, action: PayloadAction<{ date: string, id: string, attendance: AttendanceStatus }>) {
      const { date, id, attendance } = action.payload
      const list = state.eventsByDate[date] ?? []
      const item = list.find(e => e.id === id)
      if (item) item.attendance = attendance
    },
    deleteEvent(state, action: PayloadAction<{ date: string, id: string }>) {
      const { date, id } = action.payload
      state.eventsByDate[date] = (state.eventsByDate[date] ?? []).filter(e => e.id != id)
    }
  },
  extraReducers: builder => {
    builder.addCase(loadStudents.fulfilled, (state, action) => {
      state.students = action.payload
    })
    builder.addCase(scheduleMeetings.pending, (state) => {
      state.isScheduling = true
    })
    builder.addCase(scheduleMeetings.fulfilled, (state, action) => {
      state.eventsByDate = action.payload
      state.isScheduling = false
    })
    builder.addCase(scheduleMeetings.rejected, (state) => {
      state.isScheduling = false
    })
  }
})

export const scheduleMeetings = createAsyncThunk<Record<string, EventItem[]>, void, { state: { scheduler: SchedulerState } }>(
  'scheduler/schedule',
  async (_, thunk) => {
    const { selectedDates, students, filters } = thunk.getState().scheduler
    const filtered = students.filter(s => {
      const classOk = !filters.className || s.class_name.toLowerCase().includes(filters.className.toLowerCase())
      const studentOk = !filters.studentQuery || s.student_name.toLowerCase().includes(filters.studentQuery.toLowerCase())
      return classOk && studentOk
    })
    return buildSchedule(selectedDates, filtered)
  }
)

export const {
  nextMonth, prevMonth, toggleSelectDate, clearSelectedDates,
  setFilterClass, setFilterStudent,
  addEvent, updateAttendance, deleteEvent
} = slice.actions

export default slice.reducer
