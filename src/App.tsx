
import React, { useEffect } from 'react'
import Calendar from './components/Calendar/Calendar'
import FilterBar from './components/Filters/FilterBar'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import { useAppDispatch, useAppSelector } from './store'
import { loadStudents, scheduleMeetings, clearSelectedDates } from './store/slices/schedulerSlice'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(state => state.theme.isDarkMode)
  useEffect(() => { dispatch(loadStudents()) }, [dispatch])

  return (
    <div className={` p-0 container-fluid  ${isDarkMode ? 'dark' : ''}`} >
      <header className="header bg-primary text-white p-3 mb-3">
        <h4 className="mb-0">Class Meeting Scheduler</h4>
        <nav className="nav">
          <Link to="/" className="text-white text-decoration-none me-3">Calendar</Link>
          <Link to="/overview" className="text-white text-decoration-none">Overview</Link>
        </nav>
        <ThemeToggle />
      </header>

      <div className="d-flex align-items-center gap-3 mb-3 mx-2">
        <FilterBar />
        <button className="btn btn-primary" onClick={() => dispatch(scheduleMeetings())}>
          Schedule Meetings
        </button>
        <button className="btn btn-secondary" onClick={() => dispatch(clearSelectedDates())}>
          Clear Selected Dates
        </button>
      </div>

      <Calendar />
    </div>
  )
}
