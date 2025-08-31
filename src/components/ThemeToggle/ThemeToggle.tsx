import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleTheme } from '../../store/slices/themeSlice'

export default function ThemeToggle() {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(state => state.theme.isDarkMode)

  return (
    <button 
      className="theme-toggle" 
      onClick={() => dispatch(toggleTheme())}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  )
}