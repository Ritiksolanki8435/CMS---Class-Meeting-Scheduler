
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { setFilterClass, setFilterStudent } from '../../store/slices/schedulerSlice'

export default function FilterBar() {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(s => s.scheduler)
  return (
    <div className="d-flex gap-2">
      <input
        className="form-control"
        placeholder="Filter by class name"
        value={filters.className}
        onChange={(e) => dispatch(setFilterClass(e.target.value))}
      />
      <input
        className="form-control"
        placeholder="Filter by student name…"
        value={filters.studentQuery}
        onChange={(e) => dispatch(setFilterStudent(e.target.value))}
      />
    </div>
  )
}
